namespace PandaBattleship.API.Model;

public class ShipLayout
{
    public string Name { get; set; } = "";
    public List<Ship> Ships { get; set; } = new();
}