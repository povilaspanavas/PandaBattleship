var builder = DistributedApplication.CreateBuilder(args);

var dbPassword = builder.AddParameter("DbPassword", secret: true);
var dbUserName = builder.AddParameter("DbUserName", secret: true);
var db = builder
    .AddPostgres("postgres", userName: dbUserName, password: dbPassword, port: 58123)
    .WithLifetime(ContainerLifetime.Persistent)
    .AddDatabase("db", "pandaDb");

var api = builder
    .AddProject<Projects.PandaBattleship_API>("PandaBattleshipApi")
    .WithReference(db)
    .WaitFor(db)
    .WithHttpsEndpoint()
    .WithUrlForEndpoint("http", x =>
    {
        x.DisplayText = "Home (http)";
        x.DisplayOrder = 100; // give the top-most item the largest number (Aspire displays descending)
    })
    .WithUrlForEndpoint("https", x =>
    {
        x.DisplayText = "Home (https)";
        x.DisplayOrder = 90;
    })
    .WithUrls(ctx =>
    {
        var https = ctx.Urls.First(x => x.Endpoint?.EndpointName == "https");
        ctx.Urls.Add(new ResourceUrlAnnotation
        {
            DisplayText = "Health",
            Endpoint = https.Endpoint,
            Url = https.Url + "/healthui",
            DisplayOrder = 85
        });
        ctx.Urls.Add(new ResourceUrlAnnotation
        {
            DisplayText = "Check Db",
            Endpoint = https.Endpoint,
            Url = https.Url + "/db-check",
            DisplayOrder = 80
        });
    })
    // Remove duplicate with http
    .WithUrls(ctx =>
    {
        var http = ctx.Urls.First(x => x.Endpoint?.EndpointName == "http");
        ctx.Urls.Remove(http);
    })
    .WithHttpHealthCheck("health");


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