import { useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export interface GameStateDto {
    currentTurn: string;
    gameStatus: string;
    playerBoard: string[][];
    enemyBoard: string[][];
}

export const useGameHub = (gameId: string, playerId: string) => {
    const [gameState, setGameState] = useState<GameStateDto | null>(null);
    const connectionRef = useRef<signalR.HubConnection | null>(null);

    useEffect(() => {
        const query = new URLSearchParams({ gameId, playerId }).toString();
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`/gamehub?${query}`, {
                withCredentials: true // must match AllowCredentials
            })
            .withAutomaticReconnect()
            .build();

        connection.on("GameStateUpdated", (state: GameStateDto) => {
            setGameState(state);
        });

        connection.start()
            .then(() => console.log("Connected to GameHub"))
            .catch(err => console.error(err));

        connectionRef.current = connection;

        return () => {
            connection.stop();
        };
    }, [gameId, playerId]);

    const attack = (x: number, y: number) => {
        fetch("/game/attack", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ gameId, playerId, x, y })
        })
            .then(response => {
                if (response.ok) return null;
                return response.text().then(errorText => {
                    console.error("Attack request failed:", response.status, errorText);
                });
            })
            .catch(console.error);
    };

    return { gameState, attack };
};
