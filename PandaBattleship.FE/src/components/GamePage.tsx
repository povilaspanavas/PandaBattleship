// components/GamePage.tsx
import {useGameHub} from "../hooks/useGameHub";
import {Board} from "./Board";
import getOrCreatePlayerId from "../utils/playerId"
import {useState} from "react";

export function GamePage() {
    const [gameId, setGameId] = useState("game-1"); // TODOP unhardcode
    const [playerId, setPlayerId] = useState(getOrCreatePlayerId());
    const gameState = useGameHub(gameId, playerId);

    if (!gameState) return <div>Connecting...</div>;

    return (
        <div>
            <h2>Current Turn: {gameState.currentTurn}</h2>
            <h3>Status: {gameState.gameStatus}</h3>

            <div style={{display: "flex", gap: "40px"}}>
                <div>
                    <h4>Your Board</h4>
                    <Board grid={gameState.playerBoard}/>
                </div>

                <div>
                    <h4>Enemy Board</h4>
                    <Board grid={gameState.enemyBoard}/>
                </div>
            </div>

            {gameState.winner && <h1>Winner: {gameState.winner}</h1>}
        </div>
    );
}