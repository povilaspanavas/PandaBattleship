var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
builder.AddNpgsqlDataSource("db");

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.MapDefaultEndpoints();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/test", () => Results.Ok("I'm alive"));

app.MapGet("/db-check", async (Npgsql.NpgsqlDataSource dataSource) =>
{
    using var connection = await dataSource.OpenConnectionAsync();
    using var command = connection.CreateCommand();
    command.CommandText = "CREATE TABLE IF NOT EXISTS test_table (id SERIAL PRIMARY KEY, name TEXT); INSERT INTO test_table (name) VALUES ('Test ' || now()); SELECT COUNT(*) FROM test_table;";
    var count = await command.ExecuteScalarAsync();
    return Results.Ok(new { Message = "Connected to DB!", RowCount = count });
});

app.MapGet("/db-test", async (Npgsql.NpgsqlDataSource dataSource) =>
{
    using var command = dataSource.CreateCommand("SELECT version();");
    var version = await command.ExecuteScalarAsync();
    return Results.Ok(new { Version = version?.ToString() });
});

app.MapGet("/setup-db", async (Npgsql.NpgsqlDataSource dataSource) =>
{
    using var command = dataSource.CreateCommand("CREATE TABLE IF NOT EXISTS Test (Id SERIAL PRIMARY KEY, Name TEXT);");
    await command.ExecuteNonQueryAsync();
    return Results.Ok("Table created");
});

app.Run();

public partial class Program { }

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}