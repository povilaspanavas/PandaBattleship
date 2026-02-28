using PandaBattleship.API;

public class Game
{
    public string GameId { get; }
    public string CurrentPlayerId { get; private set; }
    public Dictionary<string, Board> PlayerBoards { get; }

    public Game(string gameId, Dictionary<string, Board> boards)
    {
        GameId = gameId;
        PlayerBoards = boards;

        // Randomly pick who starts
        var rnd = new Random();
        CurrentPlayerId = PlayerBoards.Keys.ElementAt(rnd.Next(PlayerBoards.Count));
    }

    public AttackResult ProcessAttack(string playerId, int x, int y)
    {
        if (playerId != CurrentPlayerId)
            throw new Exception("Not your turn");

        var opponentId = PlayerBoards.Keys.First(id => id != playerId);
        var result = PlayerBoards[opponentId].Attack(x, y);

        CurrentPlayerId = opponentId; // switch turn
        return result;
    }

    public GameStateDto GetPlayerView(string playerId)
    {
        var opponentId = PlayerBoards.Keys.First(id => id != playerId);
        return new GameStateDto
        {
            CurrentTurn = CurrentPlayerId,
            PlayerBoard = PlayerBoards[playerId].GetGrid(),
            EnemyBoard = PlayerBoards[opponentId].GetMaskedGrid()
        };
    }
}