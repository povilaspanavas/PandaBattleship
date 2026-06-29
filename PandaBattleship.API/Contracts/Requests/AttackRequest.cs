namespace PandaBattleship.API.Contracts.Requests;

public record AttackRequest(string PlayerId, int X, int Y);
