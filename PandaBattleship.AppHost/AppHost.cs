var builder = DistributedApplication.CreateBuilder(args);

var api = builder.AddProject<Projects.PandaBattleship_API>("PandaBattleshipApi");

builder.AddNpmApp("PandaBattleshipFe", "../PandaBattleship.FE")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .WithReference(api);

builder.Build().Run();