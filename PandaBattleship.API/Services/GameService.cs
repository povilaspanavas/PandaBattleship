using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text.Json;
using PandaBattleship.API.Contracts.Responses;
using PandaBattleship.API.Domain;

namespace PandaBattleship.API.Services;

public class GameService
{
    private const int RequiredPlayers = 2;
    private const int GameIdLength = 8;
    private const string GameIdAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    private readonly List<ShipLayout> _layouts;
    private readonly ConcurrentDictionary<string, GameSession> _sessions = new();

    public GameService()
    {
        var path = Path.Combine(AppContext.BaseDirectory, "Constants", "ShipLayouts.json");
        var json = File.ReadAllText(path);
        _layouts = JsonSerializer.Deserialize<List<ShipLayout>>(json)
                   ?? throw new Exception("Could not load ship layouts");
    }

    public CreateGameResponse CreateGame()
    {
        for (var attempt = 0; attempt < 10; attempt++)
        {
            var gameId = GenerateGameId();
            if (_sessions.TryAdd(gameId, new GameSession(gameId)))
            {
                return new CreateGameResponse(gameId, $"/pvp/{gameId}");
            }
        }

        throw new InvalidOperationException("Could not create a unique game id");
    }

    public JoinGameResult JoinGame(string gameId, string playerId)
    {
        if (!_sessions.TryGetValue(gameId, out var session))
        {
            return new JoinGameResult(JoinGameStatus.NotFound);
        }

        lock (session.Gate)
        {
            var isKnownPlayer = session.PlayerIds.Contains(playerId);

            if (!isKnownPlayer)
            {
                if (session.PlayerIds.Count >= RequiredPlayers || session.Game is not null)
                {
                    return new JoinGameResult(JoinGameStatus.Full, session.Game);
                }

                session.PlayerIds.Add(playerId);
            }

            if (session.PlayerIds.Count == RequiredPlayers && session.Game is null)
            {
                session.Game = CreateStartedGame(gameId, session.PlayerIds);
                return new JoinGameResult(JoinGameStatus.Started, session.Game);
            }

            if (session.Game is not null)
            {
                return new JoinGameResult(JoinGameStatus.Joined, session.Game);
            }

            return new JoinGameResult(JoinGameStatus.Waiting);
        }
    }

    public Game StartGame(string gameId, List<string> playerIds)
    {
        if (playerIds.Count != RequiredPlayers)
        {
            throw new Exception("Only 2 players supported in V1");
        }

        var session = new GameSession(gameId);
        session.PlayerIds.AddRange(playerIds);
        session.Game = CreateStartedGame(gameId, playerIds);
        _sessions[gameId] = session;

        return session.Game;
    }

    public Game? GetGame(string gameId)
    {
        if (!_sessions.TryGetValue(gameId, out var session))
        {
            return null;
        }

        lock (session.Gate)
        {
            return session.Game;
        }
    }

    public GameStateDto GetPlayerView(string gameId, string playerId)
    {
        if (!_sessions.TryGetValue(gameId, out var session))
        {
            throw new Exception("Game not found");
        }

        lock (session.Gate)
        {
            if (!session.PlayerIds.Contains(playerId))
            {
                throw new Exception("Player is not in this game");
            }

            return session.Game?.GetPlayerView(playerId) ?? GameStateDto.Waiting();
        }
    }

    public AttackResult Attack(string gameId, string playerId, int x, int y)
    {
        if (!_sessions.TryGetValue(gameId, out var session))
        {
            throw new Exception("Game not found");
        }

        lock (session.Gate)
        {
            var game = session.Game ?? throw new Exception("Game has not started");
            return game.ProcessAttack(playerId, x, y);
        }
    }

    private Game CreateStartedGame(string gameId, IReadOnlyList<string> playerIds)
    {
        if (playerIds.Count != RequiredPlayers)
        {
            throw new Exception("Only 2 players supported in V1");
        }

        var playerBoards = new Dictionary<string, Board>
        {
            [playerIds[0]] = new Board(_layouts[Random.Shared.Next(_layouts.Count)]),
            [playerIds[1]] = new Board(_layouts[Random.Shared.Next(_layouts.Count)])
        };

        return new Game(gameId, playerBoards);
    }

    private static string GenerateGameId()
    {
        var chars = new char[GameIdLength];

        for (var i = 0; i < chars.Length; i++)
        {
            chars[i] = GameIdAlphabet[RandomNumberGenerator.GetInt32(GameIdAlphabet.Length)];
        }

        return new string(chars);
    }

    private sealed class GameSession
    {
        public GameSession(string gameId)
        {
            GameId = gameId;
        }

        public string GameId { get; }
        public DateTimeOffset CreatedAt { get; } = DateTimeOffset.UtcNow;
        public object Gate { get; } = new();
        public List<string> PlayerIds { get; } = [];
        public Game? Game { get; set; }
    }
}
