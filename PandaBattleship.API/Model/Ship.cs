namespace PandaBattleship.API.Model;

public class Ship
{
    public string Type { get; set; } = "";
    public List<List<int>> Coords { get; set; } = new(); // [[x,y], ...]
}