using Microsoft.AspNetCore.Mvc.Testing;

namespace PandaBattleship.API.IntegrationTests;

public class ApiStartupTests
{
    [Fact]
    public async Task ApiStartup_CanResolveHealthEndpoint()
    {
        await using var factory = new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
                builder.UseSetting("ConnectionStrings:db", "Host=localhost;Port=1;Database=pandaDb;Username=test;Password=test");
            });

        using var client = factory.CreateClient();

        var response = await client.GetAsync("/health");
        var responseBody = await response.Content.ReadAsStringAsync();

        Assert.True(
            response.StatusCode != System.Net.HttpStatusCode.InternalServerError,
            responseBody);
    }
}
