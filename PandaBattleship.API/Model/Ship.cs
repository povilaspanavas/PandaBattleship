namespace PandaBattleship.API.Model;

using System.Text.Json.Serialization;

public class Ship
{
    [JsonPropertyName("type")]
    public string Type { get; set; } = "";

    [JsonPropertyName("coords")]
    public List<List<int>> Coords { get; set; } = new();
}