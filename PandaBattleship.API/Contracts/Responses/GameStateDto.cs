namespace PandaBattleship.API.Contracts.Responses;

public class GameStateDto
{
    public string CurrentTurn { get; set; } = "";
    public string GameStatus { get; set; } = "inProgress";
    public string[][] PlayerBoard { get; set; } = Array.Empty<string[]>();
    public string[][] EnemyBoard { get; set; } = Array.Empty<string[]>();
    public string? Winner { get; set; }

    public static GameStateDto Waiting()
    {
        return new GameStateDto
        {
            GameStatus = "waiting",
            PlayerBoard = EmptyBoard(),
            EnemyBoard = EmptyBoard()
        };
    }

    private static string[][] EmptyBoard()
    {
        return Enumerable.Range(0, 10)
            .Select(_ => Enumerable.Repeat("empty", 10).ToArray())
            .ToArray();
    }
}
