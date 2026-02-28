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
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`https://localhost:5001/gamehub?gameId=${gameId}&playerId=${playerId}`, {
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
        if (!connectionRef.current) return;
        connectionRef.current.invoke("Attack", gameId, x, y).catch(console.error);
    };

    return { gameState, attack };
};