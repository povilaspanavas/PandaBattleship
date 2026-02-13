import {useState, useEffect} from 'react';
import { SHIP_LAYOUTS } from '../constants/shipLayouts';

const GRID_SIZE = 10;

const Game = () => {
    // Helper to create an empty grid
    const createEmptyGrid = () => Array(GRID_SIZE)
        .fill(null)
        .map(() => Array(GRID_SIZE).fill(null));

    const [playerGrid, setPlayerGrid] = useState(createEmptyGrid());
    const [enemyGrid, setEnemyGrid] = useState(createEmptyGrid());
    const [enemyShipLayout, setEnemyShipLayout] = useState(null);
    const [playerShipLayout, setPlayerShipLayout] = useState(null);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [aiShotHistory, setAiShotHistory] = useState([]);

    useEffect(() => {
        // Initialize Player Grid
        const playerLayoutIdx = Math.floor(Math.random() * SHIP_LAYOUTS.length);
        const playerLayout = SHIP_LAYOUTS[playerLayoutIdx];
        setPlayerShipLayout(playerLayout);
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

    const findSunkenShip = (grid, layout) => {
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

    const markSunkShipOnGrid = (grid, sunkenShip) => {
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

    const performAiTurn = async () => {
        let continueAi = true;

        while (continueAi) {
            // Wait for "thinking"
            await new Promise(resolve => setTimeout(resolve, 800));

            let hit = false;
            let noSpots = false;

            setPlayerGrid(prevGrid => {
                const availableSpots = [];
                for (let r = 0; r < GRID_SIZE; r++) {
                    for (let c = 0; c < GRID_SIZE; c++) {
                        if (prevGrid[r][c] === null || prevGrid[r][c] === 'ship') {
                            availableSpots.push([r, c]);
                        }
                    }
                }

                if (availableSpots.length === 0) {
                    noSpots = true;
                    return prevGrid;
                }

                const [r, c] = availableSpots[Math.floor(Math.random() * availableSpots.length)];
                const isHit = prevGrid[r][c] === 'ship';
                hit = isHit;

                let newGrid = prevGrid.map(row => [...row]);
                newGrid[r][c] = isHit ? 'hit' : 'miss';

                setAiShotHistory(prev => [...prev, { row: r, col: c, isHit }]);

                if (isHit) {
                    const sunkenShip = findSunkenShip(newGrid, playerShipLayout);
                    if (sunkenShip) {
                        newGrid = markSunkShipOnGrid(newGrid, sunkenShip);
                    }
                }

                return newGrid;
            });

            // If we hit nothing more to shoot or it was a miss, stop AI turn
            if (noSpots || !hit) {
                continueAi = false;
            }
        }

        setIsPlayerTurn(true);
    };

    const handleEnemyCellClick = (row, col) => {
        if (!isPlayerTurn || enemyGrid[row][col] !== null || !enemyShipLayout) return;

        let newGrid = [...enemyGrid.map(r => [...r])];

        // Check if hit
        const isHit = enemyShipLayout.ships.some(ship =>
            ship.coords.some(([r, c]) => r === row && c === col)
        );

        newGrid[row][col] = isHit ? 'hit' : 'miss';

        // Check if a ship just sank
        const sunkenShip = findSunkenShip(newGrid, enemyShipLayout);
        if (sunkenShip) {
            newGrid = markSunkShipOnGrid(newGrid, sunkenShip);
        }

        setEnemyGrid(newGrid);

        if (!isHit) {
            setIsPlayerTurn(false);
            performAiTurn();
        }
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
            <div className={`text-2xl font-bold p-4 rounded-lg transition-colors ${isPlayerTurn ? 'text-green-400 bg-green-900/20' : 'text-red-400 bg-red-900/20'}`}>
                {isPlayerTurn ? "Your Turn" : "Enemy is Attacking..."}
            </div>

            <div className="flex flex-col items-center">
                <h2 className="text-xl mb-2 text-red-400">Enemy Waters</h2>
                {renderGrid(enemyGrid, handleEnemyCellClick)}
            </div>

            <div className="flex flex-col items-center">
                <h2 className="text-xl mb-2 text-green-400">Your Fleet</h2>
                {renderGrid(playerGrid, null, true)}
            </div>

            <div className="text-xs text-gray-500 max-h-24 overflow-y-auto">
                AI Shot History: {aiShotHistory.map((s, i) => `${i+1}: ${s.isHit ? '🔥' : 'O'} (${s.row},${s.col}) `)}
            </div>
        </div>
    );
};

export default Game;