using PandaBattleship.API.Contracts.Responses;

namespace PandaBattleship.API.Domain;

public class Game
{
    public string GameId { get; }
    public string CurrentPlayerId { get; private set; }
    public string GameStatus { get; private set; } = "inProgress";
    public string? Winner { get; private set; }
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
        if (GameStatus == "finished")
            throw new Exception("Game is already finished");

        if (playerId != CurrentPlayerId)
            throw new Exception("Not your turn");

        var opponentId = PlayerBoards.Keys.First(id => id != playerId);
        var result = PlayerBoards[opponentId].Attack(x, y);

        if (PlayerBoards[opponentId].AreAllShipsSunk())
        {
            GameStatus = "finished";
            Winner = playerId;
            return result;
        }

        if (!result.IsHit)
        {
            CurrentPlayerId = opponentId;
        }

        return result;
    }

    public GameStateDto GetPlayerView(string playerId)
    {
        var opponentId = PlayerBoards.Keys.First(id => id != playerId);
        return new GameStateDto
        {
            CurrentTurn = CurrentPlayerId,
            GameStatus = GameStatus,
            PlayerBoard = PlayerBoards[playerId].GetGrid(),
            EnemyBoard = PlayerBoards[opponentId].GetMaskedGrid(),
            Winner = Winner
        };
    }
}
