namespace PandaBattleship.API.Model;

using System.Text.Json.Serialization;

public class ShipLayout
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = "";

    [JsonPropertyName("ships")]
    public List<Ship> Ships { get; set; } = new();
}
