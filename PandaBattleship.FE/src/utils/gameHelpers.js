export const GRID_SIZE = 10;

export const createEmptyGrid = () => Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(null));

export const getSurroundingCells = (shipCoords) => {
    const surrounding = new Set();
    shipCoords.forEach(([r, c]) => {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
                    // Don't include the ship's own cells
                    if (!shipCoords.some(([sr, sc]) => sr === nr && sc === nc)) {
                        surrounding.add(`${nr},${nc}`);
                    }
                }
            }
        }
    });
    return surrounding;
};

export const findSunkenShip = (grid, layout) => {
    if (!layout) return null;

    for (const ship of layout.ships) {
        const allHit = ship.coords.every(([r, c]) => grid[r][c] === 'hit' || grid[r][c] === 'sunk');
        const isAlreadyMarkedSunk = ship.coords.every(([r, c]) => grid[r][c] === 'sunk');
        if (allHit && !isAlreadyMarkedSunk) {
            return ship;
        }
    }
    return null;
};

export const markSunkShipOnGrid = (grid, sunkenShip) => {
    const newGrid = grid.map(r => [...r]);
    // Mark ship cells as 'sunk'
    sunkenShip.coords.forEach(([r, c]) => {
        newGrid[r][c] = 'sunk';
    });

    // Mark surrounding cells as 'blocked'
    const surrounding = getSurroundingCells(sunkenShip.coords);
    surrounding.forEach(coords => {
        const [r, c] = coords.split(',').map(Number);
        if (newGrid[r][c] === null) {
            newGrid[r][c] = 'blocked';
        }
    });
    return newGrid;
};