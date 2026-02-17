import {useState, useEffect, useRef} from 'react';
import { SHIP_LAYOUTS } from '../constants/shipLayouts';
import { createEmptyGrid, findSunkenShip, markSunkShipOnGrid } from '../utils/gameHelpers';
import { processAiShot, AI_SHOT_DELAY } from '../utils/aiPlayer';
import Grid from './Grid';


const Game = () => {

    const [playerGrid, setPlayerGrid] = useState(createEmptyGrid());
    const [enemyGrid, setEnemyGrid] = useState(createEmptyGrid());
    const [enemyShipLayout, setEnemyShipLayout] = useState(null);
    const [playerShipLayout, setPlayerShipLayout] = useState(null);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [aiShotHistory, setAiShotHistory] = useState([]);

    // Ref to track target stack synchronously during AI turn loop
    const aiTargetStackRef = useRef([]);

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
        setIsPlayerTurn(false);
        let continueAi = true;
        let currentGrid = playerGrid; // Local variable to track grid state through the loop

        while (continueAi) {
            console.log('=== Starting AI shot iteration ===');
            console.log('Target stack:', JSON.stringify(aiTargetStackRef.current));

            await new Promise(resolve => setTimeout(resolve, AI_SHOT_DELAY));

            const result = processAiShot(currentGrid, aiTargetStackRef.current, playerShipLayout);

            if (result.noSpotsAvailable) {
                console.log('No targets available, ending AI turn');
                continueAi = false;
                break;
            }

            const { newGrid, updatedStack, shotResult } = result;

            // Update local grid for next iteration
            currentGrid = newGrid;

            // Update ref immediately for next iteration
            aiTargetStackRef.current = updatedStack;

            // Update state for UI (this will show each shot as it happens)
            setPlayerGrid(newGrid);
            setAiShotHistory(prev => [...prev, shotResult]);

            // Continue if we hit something
            continueAi = shotResult.isHit;
        }

        console.log('=== AI turn ending ===');
        console.log('Final stack:', JSON.stringify(aiTargetStackRef.current));

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
            performAiTurn()
                .catch(err => console.error("AI turn failed", err));
        }
    };

    return (
        <div className="flex flex-col items-center gap-1">
            <div className="flex flex-row items-center gap-4 pb-1">
                <div className={`text-l font-semibold px-2 py-1 gap-2 rounded-full transition-colors tracking-wide flex items-center 
                    ${isPlayerTurn 
                        ? ' bg-blue-200 text-cyan-700 ' 
                            : 'bg-rose-100 text-rose-700 font-semibold tracking-wide animate-pulse'}`}>
                        {isPlayerTurn ? "Aiming..." : "Enemy Attacking..."}
                </div>
                <h2 className="text-l gap-2 py-1 px-1 rounded-full bg-white shadow-sm font-poppins font-semibold text-gray-500">🎯 Enemy Waters</h2>
            </div>

            <div className="flex flex-col items-center">
                <Grid grid={enemyGrid} onCellClick={handleEnemyCellClick} />
            </div>

            <div className="flex flex-col gap-1 items-center">
                <h2 className="text-l gap-2 py-1 px-1 rounded-full bg-white shadow-sm font-poppins font-semibold text-gray-500">🚢 Your Fleet</h2>
                <Grid grid={playerGrid} onCellClick={null} isPlayerGrid={true} />
            </div>

            <div className="text-xs text-gray-500 max-h-24 overflow-y-auto">
                AI Shot History: {aiShotHistory.map((s, i) => `${i+1}: ${s.isHit ? '🔥' : 'O'} (${s.row},${s.col}) `)}
            </div>
        </div>
    );
};

export default Game;