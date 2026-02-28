namespace PandaBattleship.API;

public class GameStateDto
{
    public string CurrentTurn { get; set; } = "";
    public string GameStatus { get; set; } = "inProgress";
    public string[][] PlayerBoard { get; set; } = Array.Empty<string[]>();
    public string[][] EnemyBoard { get; set; } = Array.Empty<string[]>();
}