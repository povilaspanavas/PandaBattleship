namespace PandaBattleship.API;

public class Board
{
    private string[,] _grid = new string[10, 10]; // "empty", "ship", "hit", "miss", "sunk"

    public AttackResult Attack(int x, int y)
    {
        // Implement attack logic
        return new AttackResult { X = x, Y = y, Status = _grid[x, y] };
    }

    public string[][] GetGrid() { return new string[10][]; }

    public string[][] GetMaskedGrid() { return new string[10][]; }
}