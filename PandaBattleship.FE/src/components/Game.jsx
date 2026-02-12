import {useState, useEffect} from 'react';
import { SHIP_LAYOUTS } from '../constants/shipLayouts';

const GRID_SIZE = 10;

const Game = () => {
    // Helper to create empty grid
    const createEmptyGrid = () => Array(GRID_SIZE)
        .fill(null)
        .map(() => Array(GRID_SIZE).fill(null));

    const [playerGrid, setPlayerGrid] = useState(createEmptyGrid());
    const [enemyGrid, setEnemyGrid] = useState(createEmptyGrid());
    const [enemyShipLayout, setEnemyShipLayout] = useState(null);

    useEffect(() => {
        // Initialize Player Grid
        const playerLayoutIdx = Math.floor(Math.random() * SHIP_LAYOUTS.length);
        const playerLayout = SHIP_LAYOUTS[playerLayoutIdx];
        const newPlayerGrid = createEmptyGrid();
        playerLayout.ships.forEach(ship => {
            ship.coords.forEach(([r, c]) => {
                newPlayerGrid[r][c] = 'ship';
            });
        });
        setPlayerGrid(newPlayerGrid);

        // Initialize Enemy Layout (hidden)
        const enemyLayoutIdx = Math.floor(Math.random() * SHIP_LAYOUTS.length);
        setEnemyShipLayout(SHIP_LAYOUTS[enemyLayoutIdx]);
    }, []);

    const getSurroundingCells = (shipCoords) => {
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

    const findSunkenShip = (grid) => {
        if (!enemyShipLayout) return null;

        for (const ship of enemyShipLayout.ships) {
            const allHit = ship.coords.every(([r, c]) => grid[r][c] === 'hit');
            if (allHit) {
                return ship;
            }
        }
        return null;
    };

    const handleEnemyCellClick = (row, col) => {
        if (enemyGrid[row][col] !== null || !enemyShipLayout) return;

        const newGrid = [...enemyGrid.map(r => [...r])];

        // Check if hit
        const isHit = enemyShipLayout.ships.some(ship =>
            ship.coords.some(([r, c]) => r === row && c === col)
        );

        newGrid[row][col] = isHit ? 'hit' : 'miss';

        // Check if a ship just sank
        const sunkenShip = findSunkenShip(newGrid);
        if (sunkenShip) {
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
        }

        setEnemyGrid(newGrid);
    };


    const renderGrid = (grid, onCellClick, isPlayerGrid = false) => {
        return (
            <div className="inline-grid grid-cols-10 gap-0 border border-gray-500">
                {grid.map((rowArr, rowIndex) =>
                    rowArr.map((cell, colIndex) => (
                        <span
                            key={`${rowIndex}-${colIndex}`}
                            className={`w-8 h-8 sm:w-10 sm:h-10 border border-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors ${
                                cell === 'sunk' ? 'bg-orange-500' :
                                    cell === 'hit' ? 'text-red-500 font-bold' :
                                        cell === 'miss' || cell === 'blocked' ? 'text-blue-400' :
                                            (isPlayerGrid && cell === 'ship') ? 'bg-gray-500' : ''
                            }`}
                            onClick={() => onCellClick && onCellClick(rowIndex, colIndex)}
                        >
                            {cell === 'hit' ? '🔥' : (cell === 'miss' || cell === 'blocked') ? 'O' : ''}
                        </span>
                    ))
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center gap-8 p-4">
            <div className="flex flex-col items-center">
                <h2 className="text-xl mb-2 text-red-400">Enemy Waters</h2>
                {renderGrid(enemyGrid, handleEnemyCellClick)}
            </div>

            <div className="flex flex-col items-center">
                <h2 className="text-xl mb-2 text-green-400">Your Fleet</h2>
                {renderGrid(playerGrid, null, true)}
            </div>
        </div>
    );
};

export default Game;