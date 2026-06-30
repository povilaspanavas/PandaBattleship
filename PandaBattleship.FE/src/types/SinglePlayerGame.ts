export type Coordinate = readonly [row: number, col: number];

export type SinglePlayerCellStatus =
    | null
    | "ship"
    | "hit"
    | "miss"
    | "blocked"
    | "sunk";

export type SinglePlayerGrid = SinglePlayerCellStatus[][];

export interface ShipLayout {
    name: string;
    ships: Ship[];
}

export interface Ship {
    type: "Battleship" | "Cruiser" | "Destroyer" | "Submarine";
    coords: Coordinate[];
}

export interface ShotResult {
    row: number;
    col: number;
    isHit: boolean;
    shipSunk: boolean;
}

export type TargetStack = Coordinate[];
