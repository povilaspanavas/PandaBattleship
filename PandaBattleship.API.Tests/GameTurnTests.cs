using PandaBattleship.API.Model;

namespace PandaBattleship.API.Tests;

public class GameTurnTests
{
    [Fact]
    public void ProcessAttack_WhenPlayerHitsShip_KeepsTurnOnSamePlayer()
    {
        var game = CreateGameWithCurrentPlayer("player-1");

        var result = game.ProcessAttack("player-1", 1, 1);

        Assert.True(result.IsHit);
        Assert.Equal("player-1", game.CurrentPlayerId);
    }

    [Fact]
    public void ProcessAttack_WhenPlayerMisses_SwitchesTurnToOpponent()
    {
        var game = CreateGameWithCurrentPlayer("player-1");

        var result = game.ProcessAttack("player-1", 0, 0);

        Assert.False(result.IsHit);
        Assert.Equal("miss", result.Status);
        Assert.Equal("player-2", game.CurrentPlayerId);
    }

    [Fact]
    public void ProcessAttack_WhenPlayerShootsAlreadyHitCell_DoesNotCountAsHit()
    {
        var game = CreateGameWithCurrentPlayer("player-1");

        game.ProcessAttack("player-1", 1, 1);
        var result = game.ProcessAttack("player-1", 1, 1);

        Assert.False(result.IsHit);
        Assert.Equal("hit", result.Status);
        Assert.Equal("player-2", game.CurrentPlayerId);
    }

    [Fact]
    public void ProcessAttack_WhenPlayerSinksLastOpponentShip_FinishesGameWithWinner()
    {
        var game = CreateGameWithCurrentPlayer("player-1");

        game.ProcessAttack("player-1", 1, 1);
        game.ProcessAttack("player-1", 1, 2);

        var playerView = game.GetPlayerView("player-1");
        var opponentView = game.GetPlayerView("player-2");

        Assert.Equal("finished", game.GameStatus);
        Assert.Equal("player-1", game.Winner);
        Assert.Equal("finished", playerView.GameStatus);
        Assert.Equal("player-1", playerView.Winner);
        Assert.Equal("finished", opponentView.GameStatus);
        Assert.Equal("player-1", opponentView.Winner);
    }

    private static Game CreateGameWithCurrentPlayer(string currentPlayerId)
    {
        var game = new Game("game-1", new Dictionary<string, Board>
        {
            ["player-1"] = new(CreateLayout([[8, 8]])),
            ["player-2"] = new(CreateLayout([[1, 1], [1, 2]]))
        });

        if (game.CurrentPlayerId != currentPlayerId)
        {
            game.ProcessAttack(game.CurrentPlayerId, 0, 0);
        }

        return game;
    }

    private static ShipLayout CreateLayout(List<List<int>> coords)
    {
        return new ShipLayout
        {
            Ships =
            [
                new Ship { Type = "Test Ship", Coords = coords }
            ]
        };
    }
}
