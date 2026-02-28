// types/GameState.ts
export type CellStatus =
    | "empty"
    | "ship"
    | "hit"
    | "miss"
    | "sunk";

export interface GameState {
    currentTurn: string;
    gameStatus: "waiting" | "inProgress" | "finished";
    playerBoard: CellStatus[][];
    enemyBoard: CellStatus[][];
    winner?: string;
}