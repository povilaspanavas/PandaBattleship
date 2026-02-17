using PandaBattleship.AppHost;

var builder = DistributedApplication.CreateBuilder(args);

var dbPassword = builder.AddParameter("DbPassword", secret: true);
var dbUserName = builder.AddParameter("DbUserName", secret: true);
var db = builder
    .AddPostgres("postgres", userName: dbUserName, password: dbPassword, port: 58123)
    .WithLifetime(ContainerLifetime.Persistent)
    .AddDatabase("db", "pandaDb");

var api =
    builder
        .AddProject<Projects.PandaBattleship_API>("PandaBattleshipApi")
        .WithReference(db)
        .WaitFor(db)
        .WithHttpHealthCheck("health")
        .ConfigureCustomUrls();

builder.AddNpmApp("PandaBattleshipFe", "../PandaBattleship.FE")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .WithReference(api)
    .WithUrlForEndpoint("http", x =>
    {
        x.DisplayText = "FE (http)";
        x.DisplayOrder = 100;
    });

builder.Build().Run();