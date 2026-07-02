using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;
using PandaBattleship.API.Contracts.Responses;
using PandaBattleship.API.Domain;
using PandaBattleship.API.Services;

namespace PandaBattleship.API.Hubs;

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

        var joinResult = _gameService.JoinGame(gameId, playerId);
        if (joinResult.Status == JoinGameStatus.NotFound)
        {
            throw new HubException("Game not found");
        }
        if (joinResult.Status == JoinGameStatus.Full)
        {
            throw new HubException("Game is full");
        }

        _logger.LogInformation("Player {playerId} joined the game {gameId}", playerId, gameId);

        _connectionToPlayer[Context.ConnectionId] = playerId;
        _connectionToGame[Context.ConnectionId] = gameId;

        await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
        await SendJoinResult(gameId, playerId, joinResult);

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        if (_connectionToGame.TryGetValue(Context.ConnectionId, out var gameId))
        {
            await RemoveConnectionMappings(gameId);
        }

        // Optional: handle player leaving mid-game

        await base.OnDisconnectedAsync(exception);
    }

    public GameStateDto GetPlayerView(string gameId)
    {
        if (!_connectionToPlayer.TryGetValue(Context.ConnectionId, out var playerId))
        {
            throw new HubException("Player not recognized");
        }

        EnsureConnectionJoinedGame(gameId);

        return _gameService.GetPlayerView(gameId, playerId);
    }

    public async Task Attack(string gameId, int x, int y)
    {
        if (!_connectionToPlayer.TryGetValue(Context.ConnectionId, out var playerId))
        {
            throw new HubException("Player not recognized");
        }

        EnsureConnectionJoinedGame(gameId);

        var game = _gameService.GetGame(gameId) ?? throw new HubException("Game not found");

        _gameService.Attack(gameId, playerId, x, y);

        await SendGameStateToPlayers(game);
    }

    private async Task SendJoinResult(string gameId, string playerId, JoinGameResult joinResult)
    {
        switch (joinResult.Status)
        {
            case JoinGameStatus.Waiting:
                await Clients.Caller.SendAsync("GameStateUpdated", _gameService.GetPlayerView(gameId, playerId));
                break;
            case JoinGameStatus.Started:
                _logger.LogInformation("Both players joined {gameId}, starting game", gameId);
                await SendGameStateToPlayers(joinResult.Game!);
                break;
            case JoinGameStatus.Joined:
                await Clients.Caller.SendAsync("GameStateUpdated", _gameService.GetPlayerView(gameId, playerId));
                break;
        }
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

    private void EnsureConnectionJoinedGame(string gameId)
    {
        if (!_connectionToGame.TryGetValue(Context.ConnectionId, out var connectedGameId) ||
            !string.Equals(connectedGameId, gameId, StringComparison.Ordinal))
        {
            throw new HubException("Connection is not joined to this game");
        }
    }

    private async Task RemoveConnectionMappings(string gameId)
    {
        _connectionToPlayer.TryRemove(Context.ConnectionId, out _);
        _connectionToGame.TryRemove(Context.ConnectionId, out _);
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, gameId);
    }

    // Optional: simple chat method for debugging
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}