namespace PandaBattleship.API.Model;

public record AttackRequest(string GameId, string PlayerId, int X, int Y);