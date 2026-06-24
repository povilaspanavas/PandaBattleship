using System.Text.Json.Serialization;

namespace PandaBattleship.API.Domain;

public class ShipLayout
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = "";

    [JsonPropertyName("ships")]
    public List<Ship> Ships { get; set; } = new();
}
