import { GRID_SIZE } from './gameHelpers';

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