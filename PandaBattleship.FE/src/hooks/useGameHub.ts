import { useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import type { CellStatus } from "../types/GameState";

export interface GameStateDto {
    currentTurn: string;
    gameStatus: string;
    playerBoard: CellStatus[][];
    enemyBoard: CellStatus[][];
    winner?: string;
}

export const useGameHub = (gameId: string, playerId: string) => {
    const [gameState, setGameState] = useState<GameStateDto | null>(null);
    const connectionRef = useRef<signalR.HubConnection | null>(null);

    useEffect(() => {
        const loadPlayerView = (connection: signalR.HubConnection) => {
            connection.invoke<GameStateDto>("GetPlayerView", gameId)
                .then(state => {
                    setGameState(state);
                })
                .catch(() => {
                    // The game may not exist until the second player connects.
                });
        };

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

        connection.onreconnected(() => {
            loadPlayerView(connection);
        });

        connection.start()
            .then(() => {
                console.log("Connected to GameHub");
                loadPlayerView(connection);
            })
            .catch(err => console.error(err));

        connectionRef.current = connection;

        return () => {
            connection.stop();
        };
    }, [gameId, playerId]);

    const attack = (x: number, y: number) => {
        connectionRef.current
            ?.invoke("Attack", gameId, x, y)
            .catch(console.error);
    };

    return { gameState, attack };
};
