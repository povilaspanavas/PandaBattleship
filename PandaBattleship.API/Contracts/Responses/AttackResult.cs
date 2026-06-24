namespace PandaBattleship.API.Contracts.Responses;

public class AttackResult
{
    public int X { get; set; }
    public int Y { get; set; }
    public string Status { get; set; } = "";
    public bool IsHit { get; set; }
}
