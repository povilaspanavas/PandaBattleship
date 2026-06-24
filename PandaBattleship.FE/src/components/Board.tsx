import type { CellStatus } from "../types/GameState";

interface BoardProps {
    grid: CellStatus[][];
    onClick?: (x: number, y: number) => void;
    isPlayerGrid?: boolean;
    disabled?: boolean;
    waiting?: boolean;
}

const getCellClasses = (cell: CellStatus, isPlayerGrid: boolean) => {
    if (cell === "sunk") return "bg-orange-500";
    if (cell === "miss" || cell === "blocked") return "text-blue-400";
    if (isPlayerGrid && (cell === "hit" || cell === "ship")) return "bg-gray-400";

    return "";
};

const getCellContent = (cell: CellStatus) => {
    if (cell === "hit") return "🔥";
    if (cell === "miss" || cell === "blocked") return "O";

    return "";
};

export const Board: React.FC<BoardProps> = ({
    grid,
    onClick,
    isPlayerGrid = false,
    disabled = false,
    waiting = false,
}) => {
    const getInteractionClasses = (cell: CellStatus) => {
        if (disabled) return "cursor-not-allowed";
        if (waiting) return "cursor-wait";
        if (cell === "empty") return "cursor-pointer hover:bg-gray-700";

        return "cursor-not-allowed";
    };

    return (
        <div className={`inline-grid grid-cols-10 gap-0 border border-gray-500 ${disabled ? "cursor-not-allowed" : ""}`}>
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    const canAttack = !disabled && !waiting && cell === "empty";

                    return (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`w-8 h-8 sm:w-10 sm:h-10 border border-gray-500 flex items-center justify-center transition-colors ${getInteractionClasses(cell)} ${getCellClasses(cell, isPlayerGrid)}`}
                            onClick={() => canAttack && onClick?.(rowIndex, colIndex)}
                        >
                            {getCellContent(cell)}
                        </div>
                    );
                })
            )}
        </div>
    );
};
