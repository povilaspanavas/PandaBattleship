namespace PandaBattleship.API.Contracts.Requests;

public record AttackRequest(string GameId, string PlayerId, int X, int Y);
