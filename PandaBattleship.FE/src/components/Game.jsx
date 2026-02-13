import {useState, useEffect} from 'react';
import { SHIP_LAYOUTS } from '../constants/shipLayouts';
import { createEmptyGrid, findSunkenShip, markSunkShipOnGrid, GRID_SIZE } from '../utils/gameHelpers';
import Grid from './Grid';

const Game = () => {

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

    return (
        <div className="flex flex-col items-center gap-8 p-4">
            <div className={`text-2xl font-bold p-4 rounded-lg transition-colors ${isPlayerTurn ? 'text-green-400 bg-green-900/20' : 'text-red-400 bg-red-900/20'}`}>
                {isPlayerTurn ? "Your Turn" : "Enemy is Attacking..."}
            </div>

            <div className="flex flex-col items-center">
                <h2 className="text-xl mb-2 text-red-400">Enemy Waters</h2>
                <Grid grid={enemyGrid} onCellClick={handleEnemyCellClick} />
            </div>

            <div className="flex flex-col items-center">
                <h2 className="text-xl mb-2 text-green-400">Your Fleet</h2>
                <Grid grid={playerGrid} onCellClick={null} isPlayerGrid={true} />
            </div>

            <div className="text-xs text-gray-500 max-h-24 overflow-y-auto">
                AI Shot History: {aiShotHistory.map((s, i) => `${i+1}: ${s.isHit ? '🔥' : 'O'} (${s.row},${s.col}) `)}
            </div>
        </div>
    );
};

export default Game;