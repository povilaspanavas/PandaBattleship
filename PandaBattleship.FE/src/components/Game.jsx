import {useState} from 'react';

const GRID_SIZE = 10;

const Game = () => {
    // Helper to create empty grid
    const createEmptyGrid = () => Array(GRID_SIZE)
        .fill(null)
        .map(() => Array(GRID_SIZE).fill(null));

    const [playerGrid, setPlayerGrid] = useState(() => {
        const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));

        // 1x4 ship
        newGrid[0][0] = 'ship';
        newGrid[0][1] = 'ship';
        newGrid[1][1] = 'ship';
        newGrid[1][2] = 'ship';

        // 2x3 ships
        newGrid[3][8] = 'ship';
        newGrid[3][9] = 'ship';
        newGrid[4][9] = 'ship';
        newGrid[4][0] = 'ship';
        newGrid[4][1] = 'ship';
        newGrid[4][2] = 'ship';

        // 3x2 ships
        newGrid[6][0] = 'ship';
        newGrid[6][1] = 'ship';
        newGrid[8][1] = 'ship';
        newGrid[9][1] = 'ship';
        newGrid[0][5] = 'ship';
        newGrid[0][6] = 'ship';

        // 4x1 ships
        newGrid[2][5] = 'ship';
        newGrid[5][5] = 'ship';
        newGrid[7][6] = 'ship';
        newGrid[9][9] = 'ship';

        return newGrid;
    });
    const [enemyGrid, setEnemyGrid] = useState(createEmptyGrid());

    const handleEnemyCellClick = (row, col) => {
        if (enemyGrid[row][col] !== null) return;

        const newGrid = [...enemyGrid.map(r => [...r])];
        // For now, let's say it's a hit if row + col is even (just for demo)
        const isHit = (row + col) % 2 === 0;
        newGrid[row][col] = isHit ? 'hit' : 'miss';
        setEnemyGrid(newGrid);
    };


    const renderGrid = (grid, onCellClick, isPlayerGrid = false) => {
        return (
            <div className="inline-grid grid-cols-10 gap-0 border border-gray-500">
                {grid.map((rowArr, rowIndex) =>
                    rowArr.map((cell, colIndex) => (
                        <span
                            key={`${rowIndex}-${colIndex}`}
                            className={`w-8 h-8 sm:w-10 sm:h-10 border border-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors ${
                                cell === 'hit' ? 'text-red-500 font-bold' :
                                    cell === 'miss' ? 'text-blue-400' :
                                        (isPlayerGrid && cell === 'ship') ? 'bg-gray-500' : ''
                            }`}
                            onClick={() => onCellClick && onCellClick(rowIndex, colIndex)}
                        >
                            {cell === 'hit' ? 'X' : cell === 'miss' ? 'O' : ''}
                        </span>
                    ))
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center gap-8 p-4">
            <div className="flex flex-col items-center">
                <h2 className="text-xl mb-2 text-red-400">Enemy Waters</h2>
                {renderGrid(enemyGrid, handleEnemyCellClick)}
            </div>

            <div className="flex flex-col items-center">
                <h2 className="text-xl mb-2 text-green-400">Your Fleet</h2>
                {renderGrid(playerGrid, null, true)}
            </div>
        </div>
    );
};

export default Game;