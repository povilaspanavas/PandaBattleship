using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;

namespace PandaBattleship.API.Tests;

public class TestEndpointTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public TestEndpointTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task GetTestEndpoint_ReturnsSuccessAndCorrectContent()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/test");

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        
        var content = await response.Content.ReadAsStringAsync();
        Assert.Equal("\"I'm alive\"", content);
    }
}