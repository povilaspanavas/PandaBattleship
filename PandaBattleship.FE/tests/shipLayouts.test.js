import { describe, it, expect } from 'vitest';
import { SHIP_LAYOUTS } from '../src/constants/shipLayouts.js';

describe('shipLayouts', () => {
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
      const shipCounts = {};

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
});