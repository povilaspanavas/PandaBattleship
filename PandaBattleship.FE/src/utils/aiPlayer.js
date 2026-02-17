import { GRID_SIZE, findSunkenShip, markSunkShipOnGrid } from './gameHelpers';

/**
 * Delay in milliseconds before AI takes each shot
 */
export const AI_SHOT_DELAY = 800;

/**
 * Get orthogonal adjacent cells that haven't been shot yet
 * @param {number} row - The row coordinate
 * @param {number} col - The column coordinate
 * @param {Array} grid - The game grid
 * @returns {Array} Array of [row, col] coordinates that are valid targets
 */
export const getAdjacentTargets = (row, col, grid) => {
    const targets = [];
    const directions = [
        [-1, 0], // up
        [1, 0],  // down
        [0, -1], // left
        [0, 1]   // right
    ];

    for (const [dr, dc] of directions) {
        const r = row + dr;
        const c = col + dc;
        // Check if in bounds and not yet shot
        if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
            if (grid[r][c] === null || grid[r][c] === 'ship') {
                targets.push([r, c]);
            }
        }
    }

    return targets;
};

/**
 * Select next AI shot using hunt/target mode strategy
 * @param {Array} grid - The game grid
 * @param {Array} targetStack - LIFO stack of targets to pursue (hunt mode)
 * @returns {Array|null} [row, col] coordinates for next shot, or null if no spots available
 */
export const selectNextAiShot = (grid, targetStack) => {
    // If we have targets in hunt mode, use LIFO (pop from stack)
    if (targetStack.length > 0) {
        return targetStack[targetStack.length - 1]; // peek at top of stack
    }

    // Otherwise, pick random available spot
    const availableSpots = [];
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (grid[r][c] === null || grid[r][c] === 'ship') {
                availableSpots.push([r, c]);
            }
        }
    }

    if (availableSpots.length === 0) {
        return null;
    }

    return availableSpots[Math.floor(Math.random() * availableSpots.length)];
};

/**
 * Process a single AI shot and return the updated game state
 * @param {Array} grid - The current player grid
 * @param {Array} targetStack - Current target stack
 * @param {Object} shipLayout - Player ship layout for sunk ship detection
 * @returns {Object} Object with {newGrid, updatedStack, shotResult: {row, col, isHit}, noSpotsAvailable}
 */
export const processAiShot = (grid, targetStack, shipLayout) => {
    // Select target
    const target = selectNextAiShot(grid, targetStack);

    if (!target) {
        console.log('No targets available, ending AI turn');
        return { noSpotsAvailable: true };
    }

    const [r, c] = target;
    const isHit = grid[r][c] === 'ship';

    console.log(`AI shooting at (${r},${c}), is ship: ${isHit}`);

    let newGrid = grid.map(row => [...row]);
    newGrid[r][c] = isHit ? 'hit' : 'miss';

    let updatedStack = [...targetStack];

    // If this was a targeted shot, remove it from stack
    if (updatedStack.length > 0 && updatedStack[updatedStack.length - 1][0] === r && updatedStack[updatedStack.length - 1][1] === c) {
        updatedStack.pop();
        console.log('Removed targeted shot from stack');
    }

    if (isHit) {
        const sunkenShip = findSunkenShip(newGrid, shipLayout);
        if (sunkenShip) {
            newGrid = markSunkShipOnGrid(newGrid, sunkenShip);
            updatedStack = [];
            console.log('Ship sunk! Clearing stack.');
        } else {
            const adjacentTargets = getAdjacentTargets(r, c, newGrid);
            console.log('Hit but not sunk. Adding adjacent targets:', adjacentTargets);
            updatedStack.push(...adjacentTargets);
        }
    }

    console.log('Stack after update:', JSON.stringify(updatedStack));
    console.log('Was hit:', isHit, 'Continue:', isHit);

    return {
        newGrid,
        updatedStack,
        shotResult: { row: r, col: c, isHit },
        noSpotsAvailable: false
    };
};