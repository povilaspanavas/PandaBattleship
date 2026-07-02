import { describe, it, expect } from 'vitest';
import { SHIP_LAYOUTS } from '../src/constants/shipLayouts';
import { processAiShot } from "../src/utils/aiPlayer";
import { createEmptyGrid } from "../src/utils/gameHelpers";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import GridOriginal from "../src/components/GridOriginal";
import type { Ship } from "../src/types/SinglePlayerGame";

describe('shipLayouts', () => {
  it('should include original and generated layouts', () => {
    const originalLayoutNames = [
      "Lithuanian Classic",
      "Lithuanian Tetris",
      "Lithuanian ZigZag",
      "Lithuanian Perimeter",
      "Lithuanian Snake",
      "Lithuanian Scattered"
    ];

    expect(SHIP_LAYOUTS).toHaveLength(106);
    originalLayoutNames.forEach(name => {
      expect(SHIP_LAYOUTS.some(layout => layout.name === name)).toBe(true);
    });
  });

  it('should have correct number of ships and lengths for all layouts', () => {
    const expectedShipCounts = {
      Battleship: 1,
      Cruiser: 2,
      Destroyer: 3,
      Submarine: 4
    };

    const expectedLengths = {
      Battleship: 4,
      Cruiser: 3,
      Destroyer: 2,
      Submarine: 1
    };

    SHIP_LAYOUTS.forEach(layout => {
      const shipCounts: Record<Ship["type"], number> = {
        Battleship: 0,
        Cruiser: 0,
        Destroyer: 0,
        Submarine: 0
      };

      layout.ships.forEach(ship => {
        shipCounts[ship.type] = (shipCounts[ship.type] || 0) + 1;

        const expectedLength = expectedLengths[ship.type];
        expect(ship.coords.length,
          `[${layout.name}] ${ship.type} should have ${expectedLength} cells, but has ${ship.coords.length}`
        ).toBe(expectedLength);
      });

      expect(shipCounts,
        `[${layout.name}] should have correct ship counts. Expected: ${JSON.stringify(expectedShipCounts)}, got: ${JSON.stringify(shipCounts)}`
      ).toEqual(expectedShipCounts);
    });
  });

  it('marks a first AI hit on a larger ship as hit', () => {
    const layout = SHIP_LAYOUTS[0];
    const grid = createEmptyGrid();

    layout.ships.forEach(ship => {
      ship.coords.forEach(([row, col]) => {
        grid[row][col] = "ship";
      });
    });

    const result = processAiShot(grid, [[1, 1]], layout);

    expect(result.noSpotsAvailable).toBe(false);
    if (!result.noSpotsAvailable) {
      expect(result.shotResult).toMatchObject({ row: 1, col: 1, isHit: true, shipSunk: false });
      expect(result.newGrid[1][1]).toBe("hit");
    }
  });

  it('renders fire for hit cells in the original grid', () => {
    const grid = createEmptyGrid();
    grid[1][1] = "hit";

    const markup = renderToStaticMarkup(createElement(GridOriginal, {
      grid,
      isPlayerGrid: true,
      disabled: true,
    }));

    expect(markup).toContain("🔥");
  });
});
