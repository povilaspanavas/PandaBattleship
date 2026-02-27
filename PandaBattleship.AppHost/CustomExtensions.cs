namespace PandaBattleship.AppHost;

static class EnumerableExtensions
{
    extension(IResourceBuilder<ProjectResource> resource)
    {
        public IResourceBuilder<ProjectResource> ConfigureApiCustomUrls()
        {
            return resource
                .WithUrlForEndpoint("https", x =>
                {
                    x.DisplayText = "Home";
                    x.DisplayOrder = 90;
                })
                .WithUrls(ctx =>
                {
                    var https = ctx.Urls.First(x => x.Endpoint?.EndpointName == "http");
                    ctx.Urls.Add(new ResourceUrlAnnotation
                    {
                        DisplayText = "Health",
                        Endpoint = https.Endpoint,
                        Url = https.Url + "/health",
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
                .WithUrls(ctx =>
                {
                    var http = ctx.Urls.First(x => x.Endpoint?.EndpointName == "http");
                    ctx.Urls.Remove(http);
                });
        }
    }

    extension(IResourceBuilder<IResourceWithEndpoints> resource)
    {
        public IResourceBuilder<IResourceWithEndpoints> ConfigureFeCustomUrls()
        {
            return resource
                .WithUrlForEndpoint("http", x =>
                {
                    x.DisplayText = "Home";
                    x.DisplayOrder = 100;
                })
                .WithUrls(ctx =>
                {
                    var https = ctx.Urls.First(x => x.Endpoint?.EndpointName == "http");
                    ctx.Urls.Add(new ResourceUrlAnnotation
                    {
                        DisplayText = "AI",
                        Endpoint = https.Endpoint,
                        Url = https.Url + "/ai",
                        DisplayOrder = 85
                    });
                    ctx.Urls.Add(new ResourceUrlAnnotation
                    {
                        DisplayText = "PvP",
                        Endpoint = https.Endpoint,
                        Url = https.Url + "/pvp",
                        DisplayOrder = 85
                    });
                });
        }
    }
}