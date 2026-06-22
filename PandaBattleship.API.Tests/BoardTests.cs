using PandaBattleship.API.Model;

namespace PandaBattleship.API.Tests;

public class BoardTests
{
    [Fact]
    public void Attack_WhenSingleCellShipIsHit_MarksShipSunkAndSurroundingCellsBlocked()
    {
        var board = new Board(new ShipLayout
        {
            Ships =
            [
                new Ship { Type = "Submarine", Coords = [[1, 1]] }
            ]
        });

        board.Attack(1, 1);

        var grid = board.GetGrid();
        Assert.Equal("sunk", grid[1][1]);
        Assert.Equal("blocked", grid[0][0]);
        Assert.Equal("blocked", grid[0][1]);
        Assert.Equal("blocked", grid[0][2]);
        Assert.Equal("blocked", grid[1][0]);
        Assert.Equal("blocked", grid[1][2]);
        Assert.Equal("blocked", grid[2][0]);
        Assert.Equal("blocked", grid[2][1]);
        Assert.Equal("blocked", grid[2][2]);
    }

    [Fact]
    public void Attack_WhenLastShipCellIsHit_MarksWholeShipSunkAndPreservesExistingMisses()
    {
        var board = new Board(new ShipLayout
        {
            Ships =
            [
                new Ship { Type = "Destroyer", Coords = [[1, 1], [1, 2]] }
            ]
        });

        board.Attack(0, 0);
        board.Attack(1, 1);
        board.Attack(1, 2);

        var grid = board.GetGrid();
        Assert.Equal("miss", grid[0][0]);
        Assert.Equal("sunk", grid[1][1]);
        Assert.Equal("sunk", grid[1][2]);
        Assert.Equal("blocked", grid[0][1]);
        Assert.Equal("blocked", grid[0][2]);
        Assert.Equal("blocked", grid[0][3]);
        Assert.Equal("blocked", grid[1][0]);
        Assert.Equal("blocked", grid[1][3]);
        Assert.Equal("blocked", grid[2][0]);
        Assert.Equal("blocked", grid[2][1]);
        Assert.Equal("blocked", grid[2][2]);
        Assert.Equal("blocked", grid[2][3]);
    }

    [Fact]
    public void GetMaskedGrid_WhenShipIsSunk_ShowsSunkAndBlockedCells()
    {
        var board = new Board(new ShipLayout
        {
            Ships =
            [
                new Ship { Type = "Submarine", Coords = [[0, 0]] },
                new Ship { Type = "Submarine", Coords = [[9, 9]] }
            ]
        });

        board.Attack(0, 0);

        var grid = board.GetMaskedGrid();
        Assert.Equal("sunk", grid[0][0]);
        Assert.Equal("blocked", grid[0][1]);
        Assert.Equal("blocked", grid[1][0]);
        Assert.Equal("blocked", grid[1][1]);
        Assert.Equal("empty", grid[9][9]);
    }
}
