// hooks/useGameHub.ts
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { GameState } from "../types/GameState";

export function useGameHub(gameId: string, playerId: string) {
    const [gameState, setGameState] = useState<GameState | null>(null);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(
                `https://localhost:5001/gamehub?gameId=${gameId}&playerId=${playerId}`
            )
            .withAutomaticReconnect()
            .build();

        connection.on("GameStateUpdated", (state: GameState) => {
            console.log("Game state received:", state);
            setGameState(state);
        });

        connection.start()
            .then(() => console.log("Connected to SignalR"))
            .catch(err => console.error("Connection failed:", err));

        return () => {
            connection.stop();
        };
    }, [gameId, playerId]);

    return gameState;
}