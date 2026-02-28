namespace PandaBattleship.API;

public class Game
{
    public string GameId { get; }
    public string CurrentPlayerId { get; private set; }
    public Dictionary<string, Board> PlayerBoards { get; }

    public Game(string gameId, List<string> playerIds)
    {
        GameId = gameId;

        PlayerBoards = playerIds.ToDictionary(id => id, id => new Board());

        // Randomly pick who starts
        var rnd = new Random();
        CurrentPlayerId = playerIds[rnd.Next(playerIds.Count)];
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
        return new GameStateDto
        {
            CurrentTurn = CurrentPlayerId,
            GameStatus = "inProgress",
            PlayerBoard = PlayerBoards[playerId].GetGrid(),
            EnemyBoard = PlayerBoards.Keys
                .Where(id => id != playerId)
                .Select(id => PlayerBoards[id].GetMaskedGrid())
                .First() // for 2 players
        };
    }
}