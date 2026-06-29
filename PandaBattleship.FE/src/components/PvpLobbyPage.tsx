import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "./PageHeader";

interface CreateGameResponse {
    gameId: string;
    joinUrl: string;
}

const getGameIdFromInput = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
        return "";
    }

    try {
        const url = new URL(trimmed, window.location.origin);
        const match = url.pathname.match(/\/pvp\/([^/]+)/i);

        if (match?.[1]) {
            return decodeURIComponent(match[1]).toUpperCase();
        }
    } catch {
        // Fall back to treating the input as a raw game code.
    }

    return trimmed
        .replace(/^\/?pvp\//i, "")
        .split(/[?#]/)[0]
        .trim()
        .toUpperCase();
};

export const PvpLobbyPage: React.FC = () => {
    const navigate = useNavigate();
    const [joinInput, setJoinInput] = useState("");
    const [isStarting, setIsStarting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const startGame = async () => {
        setIsStarting(true);
        setError(null);

        try {
            const response = await fetch("/games", { method: "POST" });

            if (!response.ok) {
                throw new Error("Could not start a game");
            }

            const game = await response.json() as CreateGameResponse;
            navigate(game.joinUrl || `/pvp/${game.gameId}`);
        } catch (err) {
            console.error(err);
            setError("Could not start a game. Check that the API is running.");
        } finally {
            setIsStarting(false);
        }
    };

    const joinGame = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const gameId = getGameIdFromInput(joinInput);

        if (!gameId) {
            setError("Enter a game code or invite URL.");
            return;
        }

        navigate(`/pvp/${encodeURIComponent(gameId)}`);
    };

    return (
        <div className="max-w-5xl mx-auto p-4 text-center min-h-screen flex flex-col items-center">
            <PageHeader />

            <main className="w-full max-w-xl flex flex-col gap-4 mt-6 text-left">
                <section className="bg-white text-gray-800 rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col gap-3">
                    <div>
                        <h2 className="text-xl font-semibold">Friend Match</h2>
                        <p className="text-sm text-gray-600">Create an invite link or join with a code.</p>
                    </div>

                    <button
                        type="button"
                        className="w-full rounded-md bg-cyan-700 text-white font-semibold py-2 px-3 hover:bg-cyan-800 disabled:opacity-60 disabled:cursor-wait transition-colors"
                        disabled={isStarting}
                        onClick={startGame}
                    >
                        {isStarting ? "Starting..." : "Start New Game"}
                    </button>
                </section>

                <form
                    className="bg-white text-gray-800 rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col gap-3"
                    onSubmit={joinGame}
                >
                    <label className="text-sm font-semibold text-gray-700" htmlFor="game-code">
                        Game Code or Invite URL
                    </label>
                    <input
                        id="game-code"
                        className="rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
                        value={joinInput}
                        onChange={(event) => setJoinInput(event.target.value)}
                        placeholder="4K7D9QXA"
                    />
                    <button
                        type="submit"
                        className="w-full rounded-md bg-gray-900 text-white font-semibold py-2 px-3 hover:bg-gray-700 transition-colors"
                    >
                        Join Game
                    </button>
                </form>

                {error && (
                    <div className="rounded-md bg-rose-100 text-rose-700 font-semibold px-3 py-2 text-sm">
                        {error}
                    </div>
                )}
            </main>
        </div>
    );
};
