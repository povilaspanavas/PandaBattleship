namespace PandaBattleship.API;

public class GameStateDto
{
    public string CurrentTurn { get; set; }
    public string GameStatus { get; set; }
    public string[][] PlayerBoard { get; set; }
    public string[][] EnemyBoard { get; set; }
}