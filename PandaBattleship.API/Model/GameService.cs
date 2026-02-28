using System.Collections.Concurrent;
using PandaBattleship.API.Model;

namespace PandaBattleship.API;

using System.Text.Json;

public class GameService
{
    private readonly List<ShipLayout> _layouts;
    private readonly ConcurrentDictionary<string, Game> _games = new();

    public GameService()
    {
        var path = Path.Combine(AppContext.BaseDirectory, "Constants", "ShipLayouts.json");
        var json = File.ReadAllText(path);
        _layouts = JsonSerializer.Deserialize<List<ShipLayout>>(json)
                   ?? throw new Exception("Could not load ship layouts");
    }

    public Game StartGame(string gameId, List<string> playerIds)
    {
        if (playerIds.Count != 2)
            throw new Exception("Only 2 players supported in V1");

        var rnd = new Random();

        // Pick a random layout for each player
        var playerBoards = new Dictionary<string, Board>
        {
            [playerIds[0]] = new Board(_layouts[rnd.Next(_layouts.Count)]),
            [playerIds[1]] = new Board(_layouts[rnd.Next(_layouts.Count)])
        };

        var game = new Game(gameId, playerBoards);
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