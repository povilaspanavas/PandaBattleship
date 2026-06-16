using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;

namespace PandaBattleship.API;

public class GameHub : Hub
{
    private readonly ILogger<GameHub> _logger;
    private readonly GameService _gameService;

    // ConnectionId → PlayerId (for reconnects)
    private static readonly ConcurrentDictionary<string, string> _connectionToPlayer = new();
    private static readonly ConcurrentDictionary<string, string> _connectionToGame = new();

    public GameHub(ILogger<GameHub> logger, GameService gameService)
    {
        _logger = logger;
        _gameService = gameService;
    }

    public override async Task OnConnectedAsync()
    {
        var http = Context.GetHttpContext();
        if (http is null)
        {
            throw new HubException("HTTP context is required");
        }

        var gameId = http.Request.Query["gameId"].ToString();
        var playerId = http.Request.Query["playerId"].ToString();

        if (string.IsNullOrWhiteSpace(gameId) || string.IsNullOrWhiteSpace(playerId))
        {
            throw new HubException("gameId and playerId are required");
        }

        _logger.LogInformation("Player {playerId} joined the game {gameId}", playerId, gameId);

        // Map ConnectionId to PlayerId
        _connectionToPlayer[Context.ConnectionId] = playerId;
        _connectionToGame[Context.ConnectionId] = gameId;

        await Groups.AddToGroupAsync(Context.ConnectionId, gameId);

        var playerIds = GetConnectedPlayerIds(gameId);
        var game = _gameService.GetGame(gameId);

        if (playerIds.Count == 2 && (game is null || playerIds.Any(pid => !game.PlayerBoards.ContainsKey(pid))))
        {
            _logger.LogInformation("Both players joined {gameId}, starting game", gameId);

            game = _gameService.StartGame(gameId, playerIds);
            await SendGameStateToPlayers(game);
        }
        else if (game?.PlayerBoards.ContainsKey(playerId) == true)
        {
            await Clients.Caller.SendAsync("GameStateUpdated", game.GetPlayerView(playerId));
        }

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        // Remove mapping
        _connectionToPlayer.TryRemove(Context.ConnectionId, out _);
        _connectionToGame.TryRemove(Context.ConnectionId, out _);

        // Optional: handle player leaving mid-game

        await base.OnDisconnectedAsync(exception);
    }

    public GameStateDto GetPlayerView(string gameId)
    {
        if (!_connectionToPlayer.TryGetValue(Context.ConnectionId, out var playerId))
        {
            throw new HubException("Player not recognized");
        }

        var game = _gameService.GetGame(gameId) ?? throw new HubException("Game not found");

        return game.GetPlayerView(playerId);
    }

    public async Task Attack(string gameId, int x, int y)
    {
        if (!_connectionToPlayer.TryGetValue(Context.ConnectionId, out var playerId))
        {
            throw new HubException("Player not recognized");
        }

        var game = _gameService.GetGame(gameId) ?? throw new HubException("Game not found");

        game.ProcessAttack(playerId, x, y);

        await SendGameStateToPlayers(game);
    }

    private List<string> GetConnectedPlayerIds(string gameId)
    {
        var playerIds = new HashSet<string>();

        foreach (var (connectionId, connectedGameId) in _connectionToGame)
        {
            if (connectedGameId == gameId && _connectionToPlayer.TryGetValue(connectionId, out var playerId))
            {
                playerIds.Add(playerId);
            }
        }

        return playerIds.ToList();
    }

    private async Task SendGameStateToPlayers(Game game)
    {
        foreach (var pid in game.PlayerBoards.Keys)
        {
            var connectionIds = _connectionToPlayer
                .Where(kvp => kvp.Value == pid &&
                              _connectionToGame.TryGetValue(kvp.Key, out var gameId) &&
                              gameId == game.GameId)
                .Select(kvp => kvp.Key)
                .ToList();

            var state = game.GetPlayerView(pid);

            foreach (var connId in connectionIds)
            {
                await Clients.Client(connId).SendAsync("GameStateUpdated", state);
            }
        }
    }

    // Optional: simple chat method for debugging
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
