import { useState, useEffect, useRef } from 'react';
import { SHIP_LAYOUTS } from '../constants/shipLayouts';
import { createEmptyGrid, findSunkenShip, markSunkShipOnGrid } from '../utils/gameHelpers';
import { processAiShot, AI_SHOT_DELAY } from '../utils/aiPlayer';
import { THEMES, CLASSIC_THEME } from '../constants/themes';
import Confetti from 'react-confetti'
import GridOriginal from './GridOriginal';
import FleetBuilder from './FleetBuilder';
import PandaRage from "./PandaRage";
import type { ShipLayout, ShotResult, SinglePlayerGrid, TargetStack } from "../types/SinglePlayerGame";


const GameOriginal = () => {

    const [playerGrid, setPlayerGrid] = useState<SinglePlayerGrid>(createEmptyGrid());
    const [enemyGrid, setEnemyGrid] = useState<SinglePlayerGrid>(createEmptyGrid());
    const [enemyShipLayout, setEnemyShipLayout] = useState<ShipLayout | null>(null);
    const [playerShipLayout, setPlayerShipLayout] = useState<ShipLayout | null>(null);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [aiShotHistory, setAiShotHistory] = useState<ShotResult[]>([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [enemyDeadShips, setEnemyDeadShips] = useState(0);
    const [didPlayerWin, setDidPlayerWin] = useState(false);
    const aiTargetStackRef = useRef<TargetStack>([]);
    const playerDeadShipsRef = useRef(0);
    const [theme, setTheme] = useState(CLASSIC_THEME);
    const [isBuildingFleet, setIsBuildingFleet] = useState(false);

    function startNewGame(customPlayerLayout?: ShipLayout) {
        // Reset refs used during AI turn loop
        aiTargetStackRef.current = [];
        playerDeadShipsRef.current = 0;

        // Reset state to initial values
        setIsPlayerTurn(true);
        setAiShotHistory([]);
        setIsGameOver(false);
        setEnemyDeadShips(0);
        setDidPlayerWin(false);

        // Initialize Player Grid: use the custom-built fleet when provided,
        // otherwise pick a random predefined layout
        const playerLayoutIdx = Math.floor(Math.random() * SHIP_LAYOUTS.length);
        const playerLayout = customPlayerLayout ?? SHIP_LAYOUTS[playerLayoutIdx];
        console.log('Initializing game with player layout:', playerLayout.name);
        console.log('Player has', playerLayout.ships.length, 'ships');
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
        const enemyLayout = SHIP_LAYOUTS[enemyLayoutIdx];
        console.log('Enemy layout:', enemyLayout.name);
        console.log('Enemy has', enemyLayout.ships.length, 'ships');
        setEnemyShipLayout(enemyLayout);
        setEnemyGrid(createEmptyGrid());
    }

    useEffect(() => {
        startNewGame();
    }, []);


    const performAiTurn = async () => {
        if (isGameOver) return;
        setIsPlayerTurn(false);
        let continueAi = true;
        let currentGrid: SinglePlayerGrid = playerGrid; // Local variable to track grid state through the loop

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

            // Check if ship sunk (processAiShot already marks it as sunk on the grid)
            if (shotResult.shipSunk) {
                playerDeadShipsRef.current += 1;
                const newCount = playerDeadShipsRef.current;

                if (newCount === 10) {
                    console.log('PLAYER LOST! All 10 ships sunk - Setting game over status');
                    setIsGameOver(true);
                    setDidPlayerWin(false);
                    continueAi = false;
                    break;
                }
            }
        }

        setIsPlayerTurn(true);
    };

    const handleEnemyCellClick = (row: number, col: number) => {
        if (isGameOver) return;
        if (!isPlayerTurn || enemyGrid[row][col] !== null || !enemyShipLayout) return;

        let newGrid: SinglePlayerGrid = enemyGrid.map(r => [...r]);

        // Check if hit
        const isHit = enemyShipLayout.ships.some(ship =>
            ship.coords.some(([r, c]) => r === row && c === col)
        );

        newGrid[row][col] = isHit ? 'hit' : 'miss';

        // Check if a ship just sank
        const sunkenShip = findSunkenShip(newGrid, enemyShipLayout);
        if (sunkenShip) {
            newGrid = markSunkShipOnGrid(newGrid, sunkenShip);
            const newDeadCount = enemyDeadShips + 1;
            setEnemyDeadShips(newDeadCount);
            setEnemyGrid(newGrid);

            if (newDeadCount === 10) {
                setIsGameOver(true);
                setDidPlayerWin(true);

                return; // Don't trigger AI turn
            }
        }
        else {
            setEnemyGrid(newGrid);
        }

        if (!isHit) {
            setIsPlayerTurn(false);
            performAiTurn()
                .catch(err => console.error("AI turn failed", err));
        }
    };

    return (
        <>


            {didPlayerWin && (
                <Confetti />
            )}
            <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 pb-1">
                    <label htmlFor="theme-select" className="text-xs text-gray-500 font-semibold">Theme</label>
                    <select
                        id="theme-select"
                        value={theme.name}
                        onChange={e => setTheme(THEMES.find(t => t.name === e.target.value) ?? CLASSIC_THEME)}
                        className="text-xs rounded-full bg-white shadow-sm px-2 py-1 text-gray-600 font-semibold cursor-pointer"
                    >
                        {THEMES.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                    </select>
                    {!isBuildingFleet && (
                        <button
                            onClick={() => setIsBuildingFleet(true)}
                            // Disabled during the AI turn: starting a new game
                            // mid-loop would let stale AI shots corrupt the fresh grid
                            disabled={!isPlayerTurn && !isGameOver}
                            className="text-xs rounded-full bg-white shadow-sm px-2 py-1 text-cyan-700 font-semibold
                                hover:text-cyan-500 transition-colors cursor-pointer
                                disabled:text-gray-300 disabled:cursor-not-allowed"
                        >
                            🛠️ Build Fleet
                        </button>
                    )}
                </div>
                {isBuildingFleet ? (
                <FleetBuilder
                    onStart={layout => {
                        setIsBuildingFleet(false);
                        startNewGame(layout);
                    }}
                    onCancel={() => setIsBuildingFleet(false)}
                />
                ) : (
                <>
                {/* Stacked on small screens, side by side from lg (1024px) up */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-1 lg:gap-10">
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex flex-row items-center gap-4 pb-1">
                            { !isGameOver && <div className={`text-l font-semibold px-2 py-1 gap-2 rounded-full transition-colors tracking-wide flex items-center
                                ${isPlayerTurn
                                    ? ' bg-blue-200 text-cyan-700 '
                                        : 'bg-rose-100 text-rose-700 font-semibold tracking-wide animate-pulse'}`}>
                                    {isPlayerTurn ? theme.labels.aiming : theme.labels.enemyAttacking}
                                </div>
                            }

                            { // add a new game button
                                isGameOver &&
                                <button
                                    onClick={() => startNewGame()}
                                    className="text-l gap-2 py-1 px-1 rounded-full bg-amber-300 hover:bg-amber-100
                                    shadow-sm font-poppins font-semibold text-cyan-700 hover:text-cyan-600 transition-colors">
                                    New Game
                                </button>
                            }
                            <h2 className="text-l gap-2 py-1 px-1 rounded-full bg-white shadow-sm font-poppins font-semibold text-gray-500">{theme.labels.enemyWaters}</h2>
                        </div>

                        <div className="flex flex-col items-center">
                            <GridOriginal grid={enemyGrid} onCellClick={handleEnemyCellClick} waiting={!isPlayerTurn || isGameOver} theme={theme} />
                            {isGameOver && !didPlayerWin && (
                                <PandaRage />
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 items-center">
                        <h2 className="text-l gap-2 py-1 px-1 rounded-full bg-white shadow-sm font-poppins font-semibold text-gray-500">{theme.labels.yourFleet}</h2>
                        <GridOriginal grid={playerGrid} onCellClick={null} isPlayerGrid={true} disabled={true} theme={theme} />
                    </div>
                </div>

                <div className="text-xs text-gray-500 max-h-24 overflow-y-auto">
                    AI Shot History: {aiShotHistory.map((s, i) => `${i+1}: ${s.isHit ? theme.icons.hit : theme.icons.miss} (${s.row},${s.col}) `)}
                </div>
                </>
                )}
            </div>
        </>
    );
};

export default GameOriginal;
