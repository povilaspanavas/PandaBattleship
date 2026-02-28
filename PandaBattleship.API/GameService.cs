using System.Collections.Concurrent;

namespace PandaBattleship.API;

public class GameService
{
    private static readonly ConcurrentDictionary<string, Game> _games = new();

    public Game StartGame(string gameId, List<string> playerIds)
    {
        var game = new Game(gameId, playerIds);
        _games[gameId] = game;
        return game;
    }

    public Game? GetGame(string gameId) => _games.TryGetValue(gameId, out var g) ? g : null;

    public AttackResult Attack(string gameId, string playerId, int x, int y)
    {
        var game = GetGame(gameId) ?? throw new Exception("Game not found");
        return game.ProcessAttack(playerId, x, y);
    }
}