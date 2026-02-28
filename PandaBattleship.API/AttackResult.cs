namespace PandaBattleship.API;

public class AttackResult
{
    public int X { get; set; }
    public int Y { get; set; }
    public string Status { get; set; } // "hit", "miss", "sunk"
}