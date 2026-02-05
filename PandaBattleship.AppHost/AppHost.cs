var builder = DistributedApplication.CreateBuilder(args);

var dbPassword = builder.AddParameter("DbPassword", secret: true);
var db = builder
    .AddPostgres("postgres", password: dbPassword)
    .AddDatabase("db");


var api = builder
    .AddProject<Projects.PandaBattleship_API>("PandaBattleshipApi")
    .WaitFor(db)
    .WithReference(db);

builder.AddNpmApp("PandaBattleshipFe", "../PandaBattleship.FE")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .WithReference(api);

builder.Build().Run();