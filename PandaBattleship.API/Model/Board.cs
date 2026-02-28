using PandaBattleship.API.Model;

namespace PandaBattleship.API;

public class Board
{
    private readonly string[,] _grid = new string[10, 10]; // "empty", "ship", "hit", "miss", "sunk"

    public Board(ShipLayout layout)
    {
        // Initialize grid
        for (int x = 0; x < 10; x++)
        for (int y = 0; y < 10; y++)
            _grid[x, y] = "empty";

        // Place ships
        foreach (var ship in layout.Ships)
        {
            foreach (var coord in ship.Coords)
            {
                int x = coord[0];
                int y = coord[1];
                _grid[x, y] = "ship";
            }
        }
    }

    public AttackResult Attack(int x, int y)
    {
        string status;
        if (_grid[x, y] == "ship")
        {
            _grid[x, y] = "hit";
            status = "hit";
        }
        else if (_grid[x, y] == "empty")
        {
            _grid[x, y] = "miss";
            status = "miss";
        }
        else
        {
            status = _grid[x, y]; // already hit/miss
        }

        return new AttackResult { X = x, Y = y, Status = status };
    }

    public string[][] GetGrid()
    {
        var result = new string[10][];
        for (int i = 0; i < 10; i++)
        {
            result[i] = new string[10];
            for (int j = 0; j < 10; j++)
                result[i][j] = _grid[i, j];
        }
        return result;
    }

    public string[][] GetMaskedGrid()
    {
        // For opponent: mask unhit ships
        var result = new string[10][];
        for (int i = 0; i < 10; i++)
        {
            result[i] = new string[10];
            for (int j = 0; j < 10; j++)
            {
                result[i][j] = _grid[i, j] == "ship" ? "empty" : _grid[i, j];
            }
        }
        return result;
    }
}