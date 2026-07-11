import { Link } from "react-router";
import { PageHeader } from "./PageHeader";

interface GameLink {
    to: string;
    title: string;
    description: string;
}

const gameLinks: GameLink[] = [
    {
        to: "/ai",
        title: "Play vs AI",
        description: "Single-player game against the computer. Build your own fleet or start with a random layout.",
    },
    {
        to: "/pvp",
        title: "Play vs a Friend (PvP)",
        description: "Create a game and share the invite link, or join with a game code.",
    },
];

const fleet = [
    { count: 1, size: 4, name: "Battleship" },
    { count: 2, size: 3, name: "Cruiser" },
    { count: 3, size: 2, name: "Destroyer" },
    { count: 4, size: 1, name: "Submarine" },
];

export const HelpPage: React.FC = () => (
    <div className="max-w-5xl mx-auto p-4 text-center min-h-screen flex flex-col items-center">
        <PageHeader />

        <main className="w-full max-w-xl flex flex-col gap-4 mt-6 text-left">
            <section className="bg-white text-gray-800 rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col gap-3">
                <h2 className="text-xl font-semibold">Game Modes</h2>
                <ul className="flex flex-col gap-2">
                    {gameLinks.map((link) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className="block rounded-md border border-gray-200 p-3 hover:border-cyan-700 hover:bg-cyan-50 transition-colors"
                            >
                                <span className="font-semibold text-cyan-700">{link.title}</span>
                                <p className="text-sm text-gray-600">{link.description}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="bg-white text-gray-800 rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col gap-3">
                <div>
                    <h2 className="text-xl font-semibold">Rules</h2>
                    <p className="text-sm text-gray-600">
                        Panda Battleship follows the Lithuanian version of Battleship, played on a 10x10 grid.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold">Your Fleet</h3>
                    <ul className="mt-1 text-sm text-gray-700 list-disc list-inside">
                        {fleet.map((ship) => (
                            <li key={ship.name}>
                                {ship.count} {ship.count === 1 ? "ship" : "ships"} of {ship.size}{" "}
                                {ship.size === 1 ? "cell" : "cells"} – {ship.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold">Placing Ships</h3>
                    <ul className="mt-1 text-sm text-gray-700 list-disc list-inside">
                        <li>
                            Ships do not have to be straight lines. Any shape (L, T, Z, ...) is allowed as long as
                            all cells are connected horizontally or vertically.
                        </li>
                        <li>
                            Ships cannot touch each other, not even diagonally. Keep at least one empty cell
                            between any two ships.
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold">Playing</h3>
                    <ul className="mt-1 text-sm text-gray-700 list-disc list-inside">
                        <li>Players take turns firing at one cell of the opponent's grid.</li>
                        <li>A hit lets you shoot again; a miss passes the turn to your opponent.</li>
                        <li>The first player to sink the entire enemy fleet (all 20 cells) wins.</li>
                    </ul>
                </div>
            </section>
        </main>
    </div>
);