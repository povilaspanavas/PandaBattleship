using System.Text.Json;
using PandaBattleship.API.Domain;

namespace PandaBattleship.API.Tests;

public class ShipLayoutFileTests
{
    private const int GridSize = 10;

    [Fact]
    public void ShipLayoutsFile_ContainsOriginalAndGeneratedValidLithuanianLayouts()
    {
        var path = Path.Combine(AppContext.BaseDirectory, "Constants", "ShipLayouts.json");
        var json = File.ReadAllText(path);
        var layouts = JsonSerializer.Deserialize<List<ShipLayout>>(json);

        Assert.NotNull(layouts);
        Assert.Equal(106, layouts.Count);
        Assert.Equal(layouts.Count, layouts.Select(layout => layout.Name).Distinct().Count());
        AssertOriginalLayoutsArePresent(layouts);

        foreach (var layout in layouts)
        {
            AssertValidFleet(layout);
            AssertShipsDoNotTouch(layout);
        }
    }

    private static void AssertOriginalLayoutsArePresent(List<ShipLayout> layouts)
    {
        var originalLayoutNames = new[]
        {
            "Lithuanian Classic",
            "Lithuanian Tetris",
            "Lithuanian ZigZag",
            "Lithuanian Perimeter",
            "Lithuanian Snake",
            "Lithuanian Scattered"
        };

        foreach (var name in originalLayoutNames)
        {
            Assert.Contains(layouts, layout => layout.Name == name);
        }
    }

    private static void AssertValidFleet(ShipLayout layout)
    {
        var expectedShipCounts = new Dictionary<string, int>
        {
            ["Battleship"] = 1,
            ["Cruiser"] = 2,
            ["Destroyer"] = 3,
            ["Submarine"] = 4
        };

        var expectedCellCounts = new Dictionary<string, int>
        {
            ["Battleship"] = 4,
            ["Cruiser"] = 3,
            ["Destroyer"] = 2,
            ["Submarine"] = 1
        };

        Assert.Equal(expectedShipCounts, layout.Ships.GroupBy(ship => ship.Type)
            .ToDictionary(group => group.Key, group => group.Count()));

        foreach (var ship in layout.Ships)
        {
            Assert.Equal(expectedCellCounts[ship.Type], ship.Coords.Count);
            Assert.Equal(ship.Coords.Count, UniqueCoordinates(ship).Count);
            Assert.All(ship.Coords, coord =>
            {
                Assert.InRange(coord[0], 0, GridSize - 1);
                Assert.InRange(coord[1], 0, GridSize - 1);
            });
            AssertShipCellsAreConnected(layout, ship);
        }

        Assert.Equal(20, layout.Ships.Sum(ship => ship.Coords.Count));
    }

    private static void AssertShipCellsAreConnected(ShipLayout layout, Ship ship)
    {
        var unvisited = UniqueCoordinates(ship);
        var queue = new Queue<(int Row, int Col)>();
        queue.Enqueue(unvisited.First());
        unvisited.Remove(queue.Peek());

        while (queue.Count > 0)
        {
            var current = queue.Dequeue();
            foreach (var next in OrthogonalNeighbors(current))
            {
                if (unvisited.Remove(next))
                {
                    queue.Enqueue(next);
                }
            }
        }

        Assert.True(unvisited.Count == 0,
            $"[{layout.Name}] {ship.Type} cells must be connected horizontally or vertically.");
    }

    private static void AssertShipsDoNotTouch(ShipLayout layout)
    {
        for (var firstShipIndex = 0; firstShipIndex < layout.Ships.Count; firstShipIndex++)
        for (var secondShipIndex = firstShipIndex + 1; secondShipIndex < layout.Ships.Count; secondShipIndex++)
        {
            foreach (var first in layout.Ships[firstShipIndex].Coords)
            foreach (var second in layout.Ships[secondShipIndex].Coords)
            {
                var rowDistance = Math.Abs(first[0] - second[0]);
                var columnDistance = Math.Abs(first[1] - second[1]);

                Assert.False(rowDistance <= 1 && columnDistance <= 1,
                    $"[{layout.Name}] ships cannot touch horizontally, vertically, or diagonally.");
            }
        }
    }

    private static HashSet<(int Row, int Col)> UniqueCoordinates(Ship ship)
    {
        return ship.Coords.Select(coord => (coord[0], coord[1])).ToHashSet();
    }

    private static IEnumerable<(int Row, int Col)> OrthogonalNeighbors((int Row, int Col) coord)
    {
        yield return (coord.Row - 1, coord.Col);
        yield return (coord.Row + 1, coord.Col);
        yield return (coord.Row, coord.Col - 1);
        yield return (coord.Row, coord.Col + 1);
    }
}
