using PandaBattleship.API.Contracts.Responses;

namespace PandaBattleship.API.Domain;

public class Board
{
    private const int GridSize = 10;
    private readonly ShipLayout _layout;
    private readonly string[,] _grid = new string[GridSize, GridSize];

    public Board(ShipLayout layout)
    {
        _layout = layout;

        for (var x = 0; x < GridSize; x++)
        for (var y = 0; y < GridSize; y++)
            _grid[x, y] = "empty";

        foreach (var ship in layout.Ships)
        {
            foreach (var coord in ship.Coords)
            {
                var x = coord[0];
                var y = coord[1];
                _grid[x, y] = "ship";
            }
        }
    }

    public AttackResult Attack(int x, int y)
    {
        string status;
        var isHit = false;

        if (_grid[x, y] == "ship")
        {
            _grid[x, y] = "hit";
            status = "hit";
            isHit = true;
            MarkSunkShipIfNeeded(x, y);
        }
        else if (_grid[x, y] == "empty")
        {
            _grid[x, y] = "miss";
            status = "miss";
        }
        else
        {
            status = _grid[x, y];
        }

        return new AttackResult { X = x, Y = y, Status = status, IsHit = isHit };
    }

    private void MarkSunkShipIfNeeded(int x, int y)
    {
        var ship = _layout.Ships.FirstOrDefault(ship =>
            ship.Coords.Any(coord => coord[0] == x && coord[1] == y));

        if (ship is null || !IsShipSunk(ship) || IsShipAlreadyMarkedSunk(ship))
        {
            return;
        }

        foreach (var coord in ship.Coords)
        {
            _grid[coord[0], coord[1]] = "sunk";
        }

        foreach (var coord in ship.Coords)
        {
            BlockSurroundingCells(coord[0], coord[1], ship);
        }
    }

    private bool IsShipSunk(Ship ship)
    {
        return ship.Coords.All(coord =>
        {
            var cell = _grid[coord[0], coord[1]];
            return cell is "hit" or "sunk";
        });
    }

    private bool IsShipAlreadyMarkedSunk(Ship ship)
    {
        return ship.Coords.All(coord => _grid[coord[0], coord[1]] == "sunk");
    }

    private void BlockSurroundingCells(int x, int y, Ship ship)
    {
        for (var dx = -1; dx <= 1; dx++)
        for (var dy = -1; dy <= 1; dy++)
        {
            var nx = x + dx;
            var ny = y + dy;

            if (!IsInBounds(nx, ny) || IsShipCoordinate(ship, nx, ny))
            {
                continue;
            }

            if (_grid[nx, ny] == "empty")
            {
                _grid[nx, ny] = "blocked";
            }
        }
    }

    private static bool IsInBounds(int x, int y)
    {
        return x >= 0 && x < GridSize && y >= 0 && y < GridSize;
    }

    private static bool IsShipCoordinate(Ship ship, int x, int y)
    {
        return ship.Coords.Any(coord => coord[0] == x && coord[1] == y);
    }

    public bool AreAllShipsSunk()
    {
        return _layout.Ships.All(ship =>
            ship.Coords.All(coord => _grid[coord[0], coord[1]] == "sunk"));
    }

    public string[][] GetGrid()
    {
        var result = new string[GridSize][];
        for (var i = 0; i < GridSize; i++)
        {
            result[i] = new string[GridSize];
            for (var j = 0; j < GridSize; j++)
                result[i][j] = _grid[i, j];
        }

        return result;
    }

    public string[][] GetMaskedGrid()
    {
        var result = new string[GridSize][];
        for (var i = 0; i < GridSize; i++)
        {
            result[i] = new string[GridSize];
            for (var j = 0; j < GridSize; j++)
            {
                result[i][j] = _grid[i, j] == "ship" ? "empty" : _grid[i, j];
            }
        }

        return result;
    }
}
