import type { Coordinate, Ship, ShipLayout } from "../types/SinglePlayerGame";
import { GRID_SIZE, getSurroundingCells } from "./gameHelpers";

// A ship being edited in the fleet builder. `cells` are offsets from the
// top-left corner of the ship's bounding box; `anchor` places that corner
// on the 10x10 grid.
export interface BuilderShip {
    id: number;
    type: Ship["type"];
    shapeIndex: number;
    cells: Coordinate[];
    anchor: Coordinate;
}

// Shape catalogue per ship type. Lithuanian rules allow any shape as long as
// cells connect horizontally or vertically, so bigger ships get a few
// classic polyomino variants to cycle through. Offsets are normalized to the
// bounding-box top-left corner.
export const SHIP_SHAPES: Record<Ship["type"], Coordinate[][]> = {
    Battleship: [
        [[0, 0], [0, 1], [0, 2], [0, 3]], // I
        [[0, 0], [1, 0], [1, 1], [1, 2]], // L
        [[0, 0], [0, 1], [0, 2], [1, 1]], // T
        [[0, 1], [0, 2], [1, 0], [1, 1]], // S
        [[0, 0], [0, 1], [1, 0], [1, 1]], // square
    ],
    Cruiser: [
        [[0, 0], [0, 1], [0, 2]], // I
        [[0, 0], [0, 1], [1, 0]], // L
    ],
    Destroyer: [
        [[0, 0], [0, 1]],
    ],
    Submarine: [
        [[0, 0]],
    ],
};

// Shift offsets so the smallest row/col is 0 again after a transform.
const normalizeCells = (cells: Coordinate[]): Coordinate[] => {
    const minRow = Math.min(...cells.map(([r]) => r));
    const minCol = Math.min(...cells.map(([, c]) => c));
    return cells.map(([r, c]) => [r - minRow, c - minCol] as Coordinate);
};

// Rotate a shape 90 degrees clockwise: (r, c) -> (c, maxRow - r).
export const rotateCells = (cells: Coordinate[]): Coordinate[] => {
    const maxRow = Math.max(...cells.map(([r]) => r));
    return normalizeCells(cells.map(([r, c]) => [c, maxRow - r] as Coordinate));
};

// Keep the anchor where the whole shape still fits on the grid.
export const clampAnchor = (cells: Coordinate[], anchor: Coordinate): Coordinate => {
    const maxRow = Math.max(...cells.map(([r]) => r));
    const maxCol = Math.max(...cells.map(([, c]) => c));
    const row = Math.min(Math.max(anchor[0], 0), GRID_SIZE - 1 - maxRow);
    const col = Math.min(Math.max(anchor[1], 0), GRID_SIZE - 1 - maxCol);
    return [row, col];
};

export const absoluteCoords = (ship: BuilderShip): Coordinate[] =>
    ship.cells.map(([r, c]) => [ship.anchor[0] + r, ship.anchor[1] + c] as Coordinate);

// Starting arrangement: straight ships in alternating rows so everything is
// valid before the player touches anything.
export const createDefaultFleet = (): BuilderShip[] => {
    const anchorsByType: Record<Ship["type"], Coordinate[]> = {
        Battleship: [[0, 0]],
        Cruiser: [[2, 0], [2, 4]],
        Destroyer: [[4, 0], [4, 3], [4, 6]],
        Submarine: [[6, 0], [6, 2], [6, 4], [6, 6]],
    };

    let nextId = 1;
    return (Object.keys(anchorsByType) as Ship["type"][]).flatMap(type =>
        anchorsByType[type].map(anchor => ({
            id: nextId++,
            type,
            shapeIndex: 0,
            cells: SHIP_SHAPES[type][0],
            anchor,
        }))
    );
};

// A ship is invalid when it leaves the grid, overlaps another ship, or
// touches one (including diagonally). Both ships in a conflict are flagged
// so the player sees the whole problem highlighted.
export const findInvalidShipIds = (ships: BuilderShip[]): Set<number> => {
    const invalid = new Set<number>();
    const cellOwner = new Map<string, number>();

    ships.forEach(ship => {
        absoluteCoords(ship).forEach(([r, c]) => {
            if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) {
                invalid.add(ship.id);
                return;
            }
            const key = `${r},${c}`;
            const owner = cellOwner.get(key);
            if (owner !== undefined && owner !== ship.id) {
                invalid.add(ship.id);
                invalid.add(owner);
            }
            cellOwner.set(key, ship.id);
        });
    });

    ships.forEach(ship => {
        const surrounding = getSurroundingCells(absoluteCoords(ship));
        surrounding.forEach(key => {
            const owner = cellOwner.get(key);
            if (owner !== undefined && owner !== ship.id) {
                invalid.add(ship.id);
                invalid.add(owner);
            }
        });
    });

    return invalid;
};

export const toShipLayout = (ships: BuilderShip[]): ShipLayout => ({
    name: "Custom Fleet",
    ships: ships.map(ship => ({
        type: ship.type,
        coords: absoluteCoords(ship),
    })),
});
