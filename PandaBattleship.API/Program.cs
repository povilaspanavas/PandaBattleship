using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.AddNpgsqlDataSource("db");

builder.Services.AddOpenApi();

var app = builder.Build();

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

app.Run();

// ReSharper disable once ClassNeverInstantiated.Global
public partial class Program { }