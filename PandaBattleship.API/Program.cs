using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using PandaBattleship.API;

var builder = WebApplication.CreateBuilder(args);


builder.AddServiceDefaults();

builder.AddNpgsqlDataSource("db");

builder.Services.AddOpenApi();

// 1. Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev", policy =>
    {
        policy.WithOrigins("http://localhost:56449") // React dev server
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials(); // VERY IMPORTANT for SignalR
    });
});

builder.Services.AddSignalR();
builder.Services.AddSingleton<GameService>();

var app = builder.Build();

// 4. Use CORS
app.UseCors("AllowReactDev");

app.MapDefaultEndpoints();
app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/db-check", async (Npgsql.NpgsqlDataSource dataSource) =>
{
    await using var connection = await dataSource.OpenConnectionAsync();
    await using var command = connection.CreateCommand();
    command.CommandText = "CREATE TABLE IF NOT EXISTS test_table (id SERIAL PRIMARY KEY, name TEXT); INSERT INTO test_table (name) VALUES ('Test ' || now()); SELECT COUNT(*) FROM test_table;";
    var count = await command.ExecuteScalarAsync();
    return Results.Ok(new { Message = "Connected to DB!", RowCount = count });
});
app.MapHub<GameHub>("/gamehub");
app.Run();

// ReSharper disable once ClassNeverInstantiated.Global
public partial class Program { }