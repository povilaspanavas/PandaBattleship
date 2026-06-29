using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using PandaBattleship.API.Contracts.Requests;
using PandaBattleship.API.Services;

namespace PandaBattleship.API.Tests;

public class GameEndpointTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public GameEndpointTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task PostAttack_UsesPluralGameResourceRoute()
    {
        using var scope = _factory.Services.CreateScope();
        var gameService = scope.ServiceProvider.GetRequiredService<GameService>();
        var createdGame = gameService.CreateGame();
        gameService.JoinGame(createdGame.GameId, "player-1");
        gameService.JoinGame(createdGame.GameId, "player-2");
        var currentPlayerId = gameService.GetGame(createdGame.GameId)!.CurrentPlayerId;

        var client = _factory.CreateClient();
        var response = await client.PostAsJsonAsync(
            $"/games/{createdGame.GameId}/attacks",
            new AttackRequest(currentPlayerId, 0, 0));

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}
