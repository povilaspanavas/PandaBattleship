import { useState } from "react";
import Confetti from "react-confetti";
import { useParams } from "react-router";
import { useGameHub } from "../hooks/useGameHub";
import { Board } from "./Board";
import PandaRage from "./PandaRage";
import getOrCreatePlayerId from "../utils/playerId";
import { PageHeader } from "./PageHeader";

export const GameBoard: React.FC = () => {
    const { gameId: routeGameId = "" } = useParams();
    const gameId = routeGameId.toUpperCase();
    const playerId = getOrCreatePlayerId();
    const { gameState, attack, connectionError } = useGameHub(gameId, playerId);
    const [copyStatus, setCopyStatus] = useState("");
    const inviteUrl = `${window.location.origin}/pvp/${gameId}`;

    const copyInviteUrl = async () => {
        try {
            await navigator.clipboard.writeText(inviteUrl);
            setCopyStatus("Copied");
        } catch (err) {
            console.error(err);
            setCopyStatus("Copy failed");
        }
    };

    if (!gameState) {
        return (
            <div className="max-w-5xl mx-auto p-1 text-center min-h-screen flex flex-col items-center">
                <PageHeader />
                <InviteBar gameId={gameId} inviteUrl={inviteUrl} copyStatus={copyStatus} onCopy={copyInviteUrl} />
                <div className="text-l font-semibold px-2 py-1 gap-2 rounded-full bg-blue-200 text-cyan-700 tracking-wide">
                    {connectionError ?? "Connecting to game..."}
                </div>
            </div>
        );
    }

    const yourTurn = gameState.currentTurn === playerId;
    const isWaitingForOpponent = gameState.gameStatus === "waiting";
    const isFinished = gameState.gameStatus === "finished";
    const didPlayerWin = isFinished && gameState.winner === playerId;
    const didPlayerLose = isFinished && !didPlayerWin;

    return (
        <>
            {didPlayerWin && <Confetti />}
            <div className="max-w-5xl mx-auto p-1 text-center min-h-screen flex flex-col items-center">
                <PageHeader />
                <InviteBar gameId={gameId} inviteUrl={inviteUrl} copyStatus={copyStatus} onCopy={copyInviteUrl} />

                <div className="select-none">
                    <div className="flex flex-col items-center gap-1">
                        {/* Stacked on small screens, side by side from lg (1024px) up */}
                        <div className="flex flex-col lg:flex-row lg:items-start gap-1 lg:gap-10">
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
            </div>
            {didPlayerLose && <PandaRage />}
        </>
    );
};

interface InviteBarProps {
    gameId: string;
    inviteUrl: string;
    copyStatus: string;
    onCopy: () => void;
}

const InviteBar: React.FC<InviteBarProps> = ({ gameId, inviteUrl, copyStatus, onCopy }) => (
    <div className="w-full max-w-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-sm px-3 py-2 mb-3">
        <div className="flex-1 min-w-0 text-left">
            <div className="text-xs uppercase text-gray-500 font-semibold">Game</div>
            <div className="font-mono font-semibold truncate">{gameId || inviteUrl}</div>
        </div>
        <button
            type="button"
            className="rounded-md bg-gray-900 text-white font-semibold py-2 px-3 hover:bg-gray-700 transition-colors"
            onClick={onCopy}
        >
            {copyStatus || "Copy Invite Link"}
        </button>
    </div>
);
