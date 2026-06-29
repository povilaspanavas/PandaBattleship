using PandaBattleship.API.Services;

namespace PandaBattleship.API.Tests;

public class GameServiceTests
{
    [Fact]
    public void CreateGame_ReturnsShareablePvpUrl()
    {
        var service = new GameService();

        var game = service.CreateGame();

        Assert.Matches("^[A-Z2-9]{8}$", game.GameId);
        Assert.Equal($"/pvp/{game.GameId}", game.JoinUrl);
    }

    [Fact]
    public void JoinGame_WithFirstPlayer_WaitsForOpponent()
    {
        var service = new GameService();
        var game = service.CreateGame();

        var join = service.JoinGame(game.GameId, "player-1");
        var playerView = service.GetPlayerView(game.GameId, "player-1");

        Assert.Equal(JoinGameStatus.Waiting, join.Status);
        Assert.Null(service.GetGame(game.GameId));
        Assert.Equal("waiting", playerView.GameStatus);
    }

    [Fact]
    public void JoinGame_WithSecondPlayer_StartsGame()
    {
        var service = new GameService();
        var game = service.CreateGame();

        service.JoinGame(game.GameId, "player-1");
        var join = service.JoinGame(game.GameId, "player-2");

        Assert.Equal(JoinGameStatus.Started, join.Status);
        Assert.NotNull(service.GetGame(game.GameId));
        Assert.Equal("inProgress", service.GetPlayerView(game.GameId, "player-1").GameStatus);
        Assert.Equal("inProgress", service.GetPlayerView(game.GameId, "player-2").GameStatus);
    }

    [Fact]
    public void JoinGame_WithThirdPlayer_ReturnsFull()
    {
        var service = new GameService();
        var game = service.CreateGame();

        service.JoinGame(game.GameId, "player-1");
        service.JoinGame(game.GameId, "player-2");
        var join = service.JoinGame(game.GameId, "player-3");

        Assert.Equal(JoinGameStatus.Full, join.Status);
    }

    [Fact]
    public void JoinGame_WithExistingPlayerInStartedGame_AllowsReconnect()
    {
        var service = new GameService();
        var game = service.CreateGame();

        service.JoinGame(game.GameId, "player-1");
        service.JoinGame(game.GameId, "player-2");
        var join = service.JoinGame(game.GameId, "player-1");

        Assert.Equal(JoinGameStatus.Joined, join.Status);
        Assert.NotNull(join.Game);
    }
}
