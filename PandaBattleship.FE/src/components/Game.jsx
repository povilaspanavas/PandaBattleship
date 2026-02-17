import {useState, useEffect} from 'react';
import { flushSync } from 'react-dom';
import { SHIP_LAYOUTS } from '../constants/shipLayouts';
import { createEmptyGrid, findSunkenShip, markSunkShipOnGrid } from '../utils/gameHelpers';
import { getAdjacentTargets, selectNextAiShot, AI_SHOT_DELAY } from '../utils/aiPlayer';
import Grid from './Grid';


const Game = () => {

    const [playerGrid, setPlayerGrid] = useState(createEmptyGrid());
    const [enemyGrid, setEnemyGrid] = useState(createEmptyGrid());
    const [enemyShipLayout, setEnemyShipLayout] = useState(null);
    const [playerShipLayout, setPlayerShipLayout] = useState(null);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [aiShotHistory, setAiShotHistory] = useState([]);
    const [aiTargetStack, setAiTargetStack] = useState([]); // LIFO stack for hunt mode

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
        setIsPlayerTurn(false); // Ensure UI shows enemy attacking throughout
        let continueAi = true;
        let localTargetStack = [...aiTargetStack]; // Local copy for synchronous updates

        while (continueAi) {
            console.log('=== Starting AI shot iteration ===');
            console.log('Local target stack:', JSON.stringify(localTargetStack));
            await new Promise(resolve => setTimeout(resolve, AI_SHOT_DELAY));

            // Variables to capture results from setState
            let wasHit = false;
            let noSpotsAvailable = false;
            let updatedStack = [...localTargetStack];

            flushSync(() => {
                setPlayerGrid(prevGrid => {
                    // Select target within setState to ensure we have current grid
                    const target = selectNextAiShot(prevGrid, localTargetStack);

                    if (!target) {
                        console.log('No targets available, ending AI turn');
                        noSpotsAvailable = true;
                        return prevGrid;
                    }

                    const [r, c] = target;
                    const isHit = prevGrid[r][c] === 'ship';
                    wasHit = isHit;

                    console.log(`AI shooting at (${r},${c}), is ship: ${isHit}`);

                    let newGrid = prevGrid.map(row => [...row]);
                    newGrid[r][c] = isHit ? 'hit' : 'miss';

                    setAiShotHistory(prev => [...prev, { row: r, col: c, isHit }]);

                    // Update the local stack copy
                    updatedStack = [...localTargetStack];

                    // If this was a targeted shot, remove it from stack
                    if (updatedStack.length > 0 && updatedStack[updatedStack.length - 1][0] === r && updatedStack[updatedStack.length - 1][1] === c) {
                        updatedStack.pop();
                        console.log('Removed targeted shot from stack');
                    }

                    if (isHit) {
                        const sunkenShip = findSunkenShip(newGrid, playerShipLayout);
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
                    console.log('Was hit:', wasHit, 'Continue:', wasHit);

                    return newGrid;
                });
            });

            // Update local stack for next iteration
            localTargetStack = updatedStack;

            // Continue if we hit something
            if (noSpotsAvailable || !wasHit) {
                continueAi = false;
            }
        }

        console.log('=== AI turn ending ===');
        console.log('Final stack:', JSON.stringify(localTargetStack));

        // Update the state with final stack value
        setAiTargetStack(localTargetStack);
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