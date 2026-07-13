import type { SinglePlayerGrid } from "../types/SinglePlayerGame";
import { CLASSIC_THEME, type GameTheme } from "../constants/themes";

interface SinglePlayerBoardProps {
    grid: SinglePlayerGrid;
    onCellClick?: ((row: number, col: number) => void) | null;
    isPlayerGrid?: boolean;
    disabled?: boolean;
    waiting?: boolean;
    theme?: GameTheme;
}

const SinglePlayerBoard = ({ grid, onCellClick, isPlayerGrid = false, disabled = false, waiting = false, theme = CLASSIC_THEME }: SinglePlayerBoardProps) => {
    const cursorType = disabled ? 'cursor-not-allowed'
        : waiting ? 'cursor-wait' : 'cursor-pointer hover:bg-gray-700';
    return (
        <div className={`inline-grid grid-cols-10 gap-0 border border-gray-500 ${disabled ? 'cursor-not-allowed' : ''}`}>
            {grid.map((rowArr, rowIndex) =>
                rowArr.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`w-8 h-8 sm:w-10 sm:h-10 ${theme.iconClass} border border-gray-500 flex items-center justify-center transition-colors ${
                            cursorType    
                        } ${
                            cell === 'sunk' ? 'bg-orange-500' :
                                cell === 'miss' || cell === 'blocked' ? 'text-blue-400' :
                                    (isPlayerGrid && cell === 'hit') ? 'bg-gray-400':
                                        (isPlayerGrid && cell === 'ship') ? 'bg-gray-400' : ''
                        }`}
                        onClick={() => !disabled && onCellClick && onCellClick(rowIndex, colIndex)}
                    >
                        {cell === 'hit' ? theme.icons.hit : (cell === 'miss' || cell === 'blocked') ? theme.icons.miss : ''}
                    </div>
                ))
            )}
        </div>
    );
};

export default SinglePlayerBoard;
