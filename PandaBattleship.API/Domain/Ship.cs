using System.Text.Json.Serialization;

namespace PandaBattleship.API.Domain;

public class Ship
{
    [JsonPropertyName("type")]
    public string Type { get; set; } = "";

    [JsonPropertyName("coords")]
    public List<List<int>> Coords { get; set; } = new();
}
