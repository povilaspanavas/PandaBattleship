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
    .WithUrlForEndpoint("http", x =>
    {
        x.DisplayText = "Home (http)";
        x.DisplayOrder = 1;
    })
    .WithUrlForEndpoint("https", x =>
    {
        x.DisplayText = "Home (https)";
        x.DisplayOrder = 2;
    })
    .WithUrls(ctx =>
    {
        var http = ctx.Urls.First(x => x.Endpoint?.EndpointName == "http");
        ctx.Urls.Add(new ResourceUrlAnnotation
        {
            DisplayText = "Check Db (http)",
            Endpoint = http.Endpoint,
            Url = http.Url + "/db-check"
        });
    });



builder.AddNpmApp("PandaBattleshipFe", "../PandaBattleship.FE")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .WithReference(api);

builder.Build().Run();