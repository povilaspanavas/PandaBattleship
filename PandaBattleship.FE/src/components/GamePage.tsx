import { useGameHub, GameStateDto } from "../hooks/useGameHub";
import { Board } from "./Board";
import getOrCreatePlayerId from "../utils/playerId";

export const GameBoard: React.FC = () => {
    const gameId = "game-1";
    const playerId = getOrCreatePlayerId();
    const { gameState, attack } = useGameHub(gameId, playerId);
    if (!gameState) return <div>Waiting for game to start...</div>;

    const yourTurn = gameState.currentTurn === playerId;

    return (
        <div>
            <h3>{yourTurn ? "Your turn" : "Opponent's turn"}</h3>
            <div style={{ display: "flex" }}>
                <div>
                    <h4>Your Board</h4>
                    <Board grid={gameState.playerBoard} />
                </div>
                <div>
                    <h4>Enemy Board</h4>
                    <Board grid={gameState.enemyBoard} onClick={(x, y) => {
                        if (yourTurn) attack(x, y);
                    }} />
                </div>
            </div>
        </div>
    );
};