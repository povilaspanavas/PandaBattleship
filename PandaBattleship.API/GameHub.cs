using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;

namespace PandaBattleship.API;

public class GameHub : Hub
{
    private readonly ILogger<GameHub> _logger;
    private readonly GameService _gameService;

    // GameId → Set of PlayerIds
    private static readonly ConcurrentDictionary<string, HashSet<string>> _gameRooms = new();

    // ConnectionId → PlayerId (for reconnects)
    private static readonly ConcurrentDictionary<string, string> _connectionToPlayer = new();

    public GameHub(ILogger<GameHub> logger, GameService gameService)
    {
        _logger = logger;
        _gameService = gameService;
    }

    public override async Task OnConnectedAsync()
    {
        var http = Context.GetHttpContext();
        var gameId = http.Request.Query["gameId"];
        var playerId = http.Request.Query["playerId"];

        if (string.IsNullOrWhiteSpace(gameId) || string.IsNullOrWhiteSpace(playerId))
        {
            throw new HubException("gameId and playerId are required");
        }

        _logger.LogInformation("Player {playerId} joined the game {gameId}", playerId, gameId);

        // Map ConnectionId to PlayerId
        _connectionToPlayer[Context.ConnectionId] = playerId;

        // Add player to game room
        _gameRooms.AddOrUpdate(
            gameId,
            new HashSet<string> { playerId },
            (key, set) =>
            {
                lock (set) set.Add(playerId);
                return set;
            });

        await Groups.AddToGroupAsync(Context.ConnectionId, gameId);

        // Check if both players joined
        int count = _gameRooms[gameId].Count;
        if (count == 2)
        {
            _logger.LogInformation("Both players joined {gameId}, starting game", gameId);

            var playerIds = _gameRooms[gameId].ToList();
            var game = _gameService.StartGame(gameId, playerIds);

            // Send initial game state to each player
            foreach (var pid in playerIds)
            {
                var connectionIds = _connectionToPlayer
                    .Where(kvp => kvp.Value == pid)
                    .Select(kvp => kvp.Key);

                var state = game.GetPlayerView(pid); // personalized board view

                foreach (var connId in connectionIds)
                {
                    await Clients.Client(connId).SendAsync("GameStateUpdated", state);
                }
            }
        }

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        // Remove mapping
        _connectionToPlayer.TryRemove(Context.ConnectionId, out _);

        // Optional: handle player leaving mid-game

        await base.OnDisconnectedAsync(exception);
    }

    // Example: called by frontend via API / FE
    public async Task Attack(string gameId, int x, int y)
    {
        if (!_connectionToPlayer.TryGetValue(Context.ConnectionId, out var playerId))
        {
            throw new HubException("Player not recognized");
        }

        var game = _gameService.GetGame(gameId) ?? throw new HubException("Game not found");

        var result = game.ProcessAttack(playerId, x, y);

        // Send updated state to both players
        foreach (var pid in game.PlayerBoards.Keys)
        {
            var connectionIds = _connectionToPlayer
                .Where(kvp => kvp.Value == pid)
                .Select(kvp => kvp.Key);

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