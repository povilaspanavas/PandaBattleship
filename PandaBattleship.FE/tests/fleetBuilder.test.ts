import { describe, it, expect } from 'vitest';
import {
    SHIP_SHAPES,
    absoluteCoords,
    clampAnchor,
    createDefaultFleet,
    findInvalidShipIds,
    rotateCells,
    toShipLayout,
    type BuilderShip,
} from '../src/utils/fleetBuilder';
import type { Coordinate, Ship } from '../src/types/SinglePlayerGame';

const expectedSizes: Record<Ship["type"], number> = {
    Battleship: 4,
    Cruiser: 3,
    Destroyer: 2,
    Submarine: 1,
};

// Every cell must be reachable from the first cell via horizontal/vertical
// steps — the Lithuanian rules connectivity requirement.
const isConnected = (cells: Coordinate[]): boolean => {
    const key = ([r, c]: Coordinate) => `${r},${c}`;
    const cellSet = new Set(cells.map(key));
    const visited = new Set<string>([key(cells[0])]);
    const queue: Coordinate[] = [cells[0]];
    while (queue.length > 0) {
        const [r, c] = queue.shift()!;
        const neighbors: Coordinate[] = [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]];
        neighbors.forEach(next => {
            if (cellSet.has(key(next)) && !visited.has(key(next))) {
                visited.add(key(next));
                queue.push(next);
            }
        });
    }
    return visited.size === cells.length;
};

const makeShip = (id: number, type: Ship["type"], anchor: Coordinate, cells?: Coordinate[]): BuilderShip => ({
    id,
    type,
    shapeIndex: 0,
    cells: cells ?? SHIP_SHAPES[type][0],
    anchor,
});

describe('SHIP_SHAPES', () => {
    it('every shape has the correct cell count for its ship type', () => {
        (Object.keys(SHIP_SHAPES) as Ship["type"][]).forEach(type => {
            SHIP_SHAPES[type].forEach(shape => {
                expect(shape.length, `${type} shape should have ${expectedSizes[type]} cells`)
                    .toBe(expectedSizes[type]);
            });
        });
    });

    it('every shape is connected horizontally/vertically', () => {
        (Object.keys(SHIP_SHAPES) as Ship["type"][]).forEach(type => {
            SHIP_SHAPES[type].forEach((shape, i) => {
                expect(isConnected(shape), `${type} shape ${i} should be connected`).toBe(true);
            });
        });
    });
});

describe('rotateCells', () => {
    it('preserves cell count and connectivity', () => {
        SHIP_SHAPES.Battleship.forEach(shape => {
            const rotated = rotateCells(shape);
            expect(rotated.length).toBe(shape.length);
            expect(isConnected(rotated)).toBe(true);
        });
    });

    it('returns the original shape after four rotations', () => {
        SHIP_SHAPES.Battleship.forEach(shape => {
            let cells = shape;
            for (let i = 0; i < 4; i++) {
                cells = rotateCells(cells);
            }
            const sortCells = (list: Coordinate[]) =>
                [...list].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
            expect(sortCells(cells)).toEqual(sortCells(shape));
        });
    });

    it('turns a horizontal destroyer vertical', () => {
        expect(rotateCells([[0, 0], [0, 1]])).toEqual([[0, 0], [1, 0]]);
    });
});

describe('clampAnchor', () => {
    it('pulls a shape back inside the grid', () => {
        const straightFour: Coordinate[] = [[0, 0], [0, 1], [0, 2], [0, 3]];
        expect(clampAnchor(straightFour, [0, 8])).toEqual([0, 6]);
        expect(clampAnchor(straightFour, [-2, -5])).toEqual([0, 0]);
        expect(clampAnchor(straightFour, [12, 3])).toEqual([9, 3]);
    });
});

describe('createDefaultFleet', () => {
    it('creates the full Lithuanian fleet', () => {
        const fleet = createDefaultFleet();
        expect(fleet).toHaveLength(10);
        const countByType = fleet.reduce<Record<string, number>>((acc, ship) => {
            acc[ship.type] = (acc[ship.type] ?? 0) + 1;
            return acc;
        }, {});
        expect(countByType).toEqual({ Battleship: 1, Cruiser: 2, Destroyer: 3, Submarine: 4 });
    });

    it('starts with a valid arrangement', () => {
        expect(findInvalidShipIds(createDefaultFleet()).size).toBe(0);
    });
});

describe('findInvalidShipIds', () => {
    it('accepts ships separated by at least one cell', () => {
        const ships = [
            makeShip(1, 'Destroyer', [0, 0]),
            makeShip(2, 'Destroyer', [2, 0]),
        ];
        expect(findInvalidShipIds(ships).size).toBe(0);
    });

    it('flags both ships when they touch side by side', () => {
        const ships = [
            makeShip(1, 'Destroyer', [0, 0]),
            makeShip(2, 'Destroyer', [1, 0]),
        ];
        expect(findInvalidShipIds(ships)).toEqual(new Set([1, 2]));
    });

    it('flags both ships when they touch diagonally', () => {
        const ships = [
            makeShip(1, 'Submarine', [0, 0]),
            makeShip(2, 'Submarine', [1, 1]),
        ];
        expect(findInvalidShipIds(ships)).toEqual(new Set([1, 2]));
    });

    it('flags overlapping ships', () => {
        const ships = [
            makeShip(1, 'Destroyer', [0, 0]),
            makeShip(2, 'Destroyer', [0, 1]),
        ];
        expect(findInvalidShipIds(ships)).toEqual(new Set([1, 2]));
    });

    it('flags a ship hanging off the grid', () => {
        const ships = [makeShip(1, 'Destroyer', [0, 9])];
        expect(findInvalidShipIds(ships)).toEqual(new Set([1]));
    });
});

describe('toShipLayout', () => {
    it('converts builder ships to absolute coordinates', () => {
        const ships = [makeShip(1, 'Cruiser', [3, 4], [[0, 0], [0, 1], [1, 0]])];
        const layout = toShipLayout(ships);
        expect(layout.name).toBe('Custom Fleet');
        expect(layout.ships).toEqual([
            { type: 'Cruiser', coords: [[3, 4], [3, 5], [4, 4]] },
        ]);
    });

    it('absoluteCoords offsets cells by the anchor', () => {
        const ship = makeShip(1, 'Destroyer', [5, 5]);
        expect(absoluteCoords(ship)).toEqual([[5, 5], [5, 6]]);
    });
});
