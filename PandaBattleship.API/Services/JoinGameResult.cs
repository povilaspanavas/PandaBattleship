using PandaBattleship.API.Domain;

namespace PandaBattleship.API.Services;

public enum JoinGameStatus
{
    Waiting,
    Joined,
    Started,
    NotFound,
    Full
}

public sealed record JoinGameResult(JoinGameStatus Status, Game? Game = null)
{
    public bool IsSuccess => Status is JoinGameStatus.Waiting or JoinGameStatus.Joined or JoinGameStatus.Started;
}
