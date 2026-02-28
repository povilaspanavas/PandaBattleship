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
        .WithHttpsEndpoint(port: 5001)
        .WaitFor(db)
        .WithHttpHealthCheck("health")
        .ConfigureApiCustomUrls();

builder.AddNpmApp("PandaBattleshipFe", "../PandaBattleship.FE")
    .WithHttpEndpoint(env: "PORT", port: 56449)
    .WithExternalHttpEndpoints()
    .WithReference(api)
    .ConfigureFeCustomUrls();


builder.Build().Run();