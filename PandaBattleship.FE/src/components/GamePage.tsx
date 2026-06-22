import Confetti from "react-confetti";
import { useGameHub } from "../hooks/useGameHub";
import { Board } from "./Board";
import getOrCreatePlayerId from "../utils/playerId";
import pandaLogo from "../assets/brave_panda_1024.png";

const PageHeader = () => (
    <div className="flex items-center gap-2">
        <h1 className="font-bold text-3xl">Panda Battleship</h1>
        <img src={pandaLogo} className="max-w-30" alt="Panda Battleship" />
    </div>
);

export const GameBoard: React.FC = () => {
    const gameId = "game-1";
    const playerId = getOrCreatePlayerId();
    const { gameState, attack } = useGameHub(gameId, playerId);

    if (!gameState) {
        return (
            <div className="max-w-5xl mx-auto p-1 text-center min-h-screen flex flex-col items-center">
                <PageHeader />
                <div className="text-l font-semibold px-2 py-1 gap-2 rounded-full bg-blue-200 text-cyan-700 tracking-wide">
                    Waiting for game to start...
                </div>
            </div>
        );
    }

    const yourTurn = gameState.currentTurn === playerId;
    const isWaitingForOpponent = gameState.gameStatus === "waiting";
    const isFinished = gameState.gameStatus === "finished";
    const didPlayerWin = isFinished && gameState.winner === playerId;

    return (
        <>
            {didPlayerWin && <Confetti />}
            <div className="max-w-5xl mx-auto p-1 text-center min-h-screen flex flex-col items-center">
                <PageHeader />

                <div className="select-none">
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex flex-row items-center gap-4 pb-1">
                            {!isFinished && (
                                <div className={`text-l font-semibold px-2 py-1 gap-2 rounded-full transition-colors tracking-wide flex items-center ${
                                    yourTurn && !isWaitingForOpponent
                                        ? "bg-blue-200 text-cyan-700"
                                        : "bg-rose-100 text-rose-700 font-semibold tracking-wide animate-pulse"
                                }`}>
                                    {isWaitingForOpponent
                                        ? "Waiting for opponent..."
                                        : yourTurn
                                            ? "Aiming..."
                                            : "Opponent Attacking..."}
                                </div>
                            )}

                            {isFinished && (
                                <div className={`text-l font-semibold px-2 py-1 gap-2 rounded-full tracking-wide ${
                                    didPlayerWin
                                        ? "bg-blue-200 text-cyan-700"
                                        : "bg-rose-100 text-rose-700"
                                }`}>
                                    {didPlayerWin ? "You won!" : "Opponent won!"}
                                </div>
                            )}

                            <h2 className="text-l gap-2 py-1 px-1 rounded-full bg-white shadow-sm font-poppins font-semibold text-gray-500">
                                🎯 Enemy Waters
                            </h2>
                        </div>

                        <div className="flex flex-col items-center">
                            <Board
                                grid={gameState.enemyBoard}
                                waiting={!yourTurn || isWaitingForOpponent}
                                disabled={isFinished || isWaitingForOpponent}
                                onClick={(x, y) => {
                                    if (yourTurn && !isFinished && !isWaitingForOpponent) {
                                        attack(x, y);
                                    }
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-1 items-center">
                            <h2 className="text-l gap-2 py-1 px-1 rounded-full bg-white shadow-sm font-poppins font-semibold text-gray-500">
                                🚢 Your Fleet
                            </h2>
                            <Board
                                grid={gameState.playerBoard}
                                isPlayerGrid={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
