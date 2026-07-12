import { Link } from "react-router";
import { PageHeader } from "./PageHeader";

interface GameMode {
    to: string;
    title: string;
    description: string;
    cta: string;
}

const gameModes: GameMode[] = [
    {
        to: "/ai",
        title: "Play vs AI",
        description: "Jump straight into a single-player game against the computer. Build your own fleet or start with a random layout.",
        cta: "Quick play",
    },
    {
        to: "/pvp",
        title: "Play vs a Friend",
        description: "Create a game and share the invite link, or join with a game code.",
        cta: "Open lobby",
    },
];

export const HomePage: React.FC = () => (
    <div className="max-w-5xl mx-auto p-4 text-center min-h-screen flex flex-col items-center">
        <PageHeader />

        <main className="w-full max-w-xl flex flex-col gap-4 mt-6">
            {gameModes.map((mode) => (
                <Link
                    key={mode.to}
                    to={mode.to}
                    className="block bg-white text-gray-800 rounded-lg shadow-sm border border-gray-200 p-6 text-left hover:border-cyan-700 hover:bg-cyan-50 transition-colors"
                >
                    <h2 className="text-2xl font-semibold text-cyan-700">{mode.title}</h2>
                    <p className="mt-1 text-gray-600">{mode.description}</p>
                    <span className="inline-block mt-3 rounded-md bg-cyan-700 px-4 py-2 font-semibold text-white">
                        {mode.cta}
                    </span>
                </Link>
            ))}

            <section className="bg-white text-gray-800 rounded-lg shadow-sm border border-gray-200 p-4 text-left">
                <h2 className="text-xl font-semibold">How to play</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Panda Battleship follows the Lithuanian rules on a 10x10 grid: ships can be any
                    connected shape, ships cannot touch each other, and a hit lets you shoot again.
                    The first player to sink all 20 enemy ship cells wins.
                </p>
                <Link to="/help" className="inline-block mt-2 text-sm font-semibold text-cyan-700 hover:underline">
                    Read the full rules
                </Link>
            </section>
        </main>
    </div>
);
