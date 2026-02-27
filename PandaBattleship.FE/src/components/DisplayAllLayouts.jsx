import { SHIP_LAYOUTS } from '../constants/shipLayouts';
import { memo } from 'react';

const GRID_SIZE = 10;

const DisplayAllLayouts = () => {
    const createGridFromLayout = (layout) => {
        const grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
        layout.ships.forEach(ship => {
            ship.coords.forEach(([r, c]) => {
                grid[r][c] = 'ship';
            });
        });
        return grid;
    };

    return (
        <div className="flex flex-col gap-12 p-8 bg-gray-900 text-white w-full">
            <h2 className="text-3xl font-bold text-center mb-4">Development View: All Ship Layouts</h2>
            <div className="flex flex-wrap justify-center gap-8">
                {SHIP_LAYOUTS.map((layout, index) => (
                    <div key={index} className="flex flex-col items-center gap-4">
                        <h3 className="text-xl font-semibold text-blue-300">{layout.name}</h3>
                        <div className="inline-grid grid-cols-10 gap-0 border border-gray-500">
                            {createGridFromLayout(layout).map((rowArr, rowIndex) =>
                                rowArr.map((cell, colIndex) => (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`w-6 h-6 sm:w-8 sm:h-8 border border-gray-700 flex items-center justify-center ${
                                            cell === 'ship' ? 'bg-blue-600' : 'bg-gray-800'
                                        }`}
                                    >
                                        {/* Optional: coordinate debug */}
                                        {/* <span className="text-[8px] opacity-20">{rowIndex},{colIndex}</span> */}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(DisplayAllLayouts);