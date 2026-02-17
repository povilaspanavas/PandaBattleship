const Grid = ({ grid, onCellClick, isPlayerGrid = false }) => {
    return (
        <div className="inline-grid grid-cols-10 gap-0 border border-gray-500">
            {grid.map((rowArr, rowIndex) =>
                rowArr.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`w-8 h-8 sm:w-10 sm:h-10 border border-gray-500 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors ${
                            cell === 'sunk' ? 'bg-orange-500' :
                                cell === 'miss' || cell === 'blocked' ? 'text-blue-400' :
                                    (isPlayerGrid && cell === 'hit') ? 'bg-gray-400':
                                        (isPlayerGrid && cell === 'ship') ? 'bg-gray-400' : ''
                        }`}
                        onClick={() => onCellClick && onCellClick(rowIndex, colIndex)}
                    >
                        {cell === 'hit' ? '🔥' : (cell === 'miss' || cell === 'blocked') ? 'O' : ''}
                    </div>
                ))
            )}
        </div>
    );
};

export default Grid;