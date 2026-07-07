import { useMemo, useRef, useState } from 'react';
import { GRID_SIZE } from '../utils/gameHelpers';
import {
    SHIP_SHAPES,
    absoluteCoords,
    clampAnchor,
    createDefaultFleet,
    findInvalidShipIds,
    rotateCells,
    toShipLayout,
    type BuilderShip,
} from '../utils/fleetBuilder';
import type { Coordinate, ShipLayout } from '../types/SinglePlayerGame';

interface FleetBuilderProps {
    onStart: (layout: ShipLayout) => void;
    onCancel: () => void;
}

const FleetBuilder = ({ onStart, onCancel }: FleetBuilderProps) => {
    const [ships, setShips] = useState<BuilderShip[]>(createDefaultFleet);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    // Which ship is being dragged and which cell of it the pointer grabbed,
    // so the ship moves relative to the grab point instead of jumping.
    const dragRef = useRef<{ shipId: number; grabOffset: Coordinate } | null>(null);

    const invalidIds = useMemo(() => findInvalidShipIds(ships), [ships]);
    const selectedShip = ships.find(s => s.id === selectedId) ?? null;

    // Map "row,col" -> ship id for rendering and hit-testing.
    const cellOwner = useMemo(() => {
        const owner = new Map<string, number>();
        ships.forEach(ship =>
            absoluteCoords(ship).forEach(([r, c]) => owner.set(`${r},${c}`, ship.id))
        );
        return owner;
    }, [ships]);

    const cellFromPointer = (e: React.PointerEvent): Coordinate | null => {
        const rect = gridRef.current?.getBoundingClientRect();
        if (!rect) return null;
        const col = Math.floor(((e.clientX - rect.left) / rect.width) * GRID_SIZE);
        const row = Math.floor(((e.clientY - rect.top) / rect.height) * GRID_SIZE);
        if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return null;
        return [row, col];
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        const cell = cellFromPointer(e);
        if (!cell) return;
        const shipId = cellOwner.get(`${cell[0]},${cell[1]}`);
        if (shipId === undefined) {
            setSelectedId(null);
            return;
        }
        const ship = ships.find(s => s.id === shipId)!;
        setSelectedId(shipId);
        dragRef.current = {
            shipId,
            grabOffset: [cell[0] - ship.anchor[0], cell[1] - ship.anchor[1]],
        };
        // Capture so the drag keeps tracking even when the pointer leaves the
        // grid. Throws for synthetic events (tests), where capture isn't needed.
        try {
            gridRef.current?.setPointerCapture(e.pointerId);
        } catch { /* no active pointer to capture */ }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        const drag = dragRef.current;
        if (!drag) return;
        const cell = cellFromPointer(e);
        if (!cell) return;
        setShips(prev => prev.map(ship => {
            if (ship.id !== drag.shipId) return ship;
            const wanted: Coordinate = [cell[0] - drag.grabOffset[0], cell[1] - drag.grabOffset[1]];
            const anchor = clampAnchor(ship.cells, wanted);
            if (anchor[0] === ship.anchor[0] && anchor[1] === ship.anchor[1]) return ship;
            return { ...ship, anchor };
        }));
    };

    const handlePointerUp = () => {
        dragRef.current = null;
    };

    const rotateSelected = () => {
        if (!selectedShip) return;
        setShips(prev => prev.map(ship => {
            if (ship.id !== selectedShip.id) return ship;
            const cells = rotateCells(ship.cells);
            return { ...ship, cells, anchor: clampAnchor(cells, ship.anchor) };
        }));
    };

    const switchShapeOfSelected = () => {
        if (!selectedShip) return;
        setShips(prev => prev.map(ship => {
            if (ship.id !== selectedShip.id) return ship;
            const shapes = SHIP_SHAPES[ship.type];
            const shapeIndex = (ship.shapeIndex + 1) % shapes.length;
            const cells = shapes[shapeIndex];
            return { ...ship, shapeIndex, cells, anchor: clampAnchor(cells, ship.anchor) };
        }));
    };

    const canSwitchShape = selectedShip !== null && SHIP_SHAPES[selectedShip.type].length > 1;
    const isFleetValid = invalidIds.size === 0;

    const toolbarButton = "text-sm py-1 px-3 rounded-full bg-white shadow-sm font-semibold " +
        "text-cyan-700 hover:text-cyan-500 transition-colors " +
        "disabled:text-gray-300 disabled:cursor-not-allowed";

    return (
        <div className="flex flex-col items-center gap-2">
            <h2 className="text-l py-1 px-3 rounded-full bg-white shadow-sm font-poppins font-semibold text-gray-500">
                🛠️ Build Your Fleet
            </h2>
            <p className="text-xs text-gray-500 text-center max-w-md">
                Drag a ship to move it. Select a ship, then rotate it or switch its shape.
                Ships cannot touch each other — conflicts show in red.
            </p>

            <div className="flex flex-row gap-2">
                <button onClick={rotateSelected} disabled={!selectedShip} className={toolbarButton}>
                    ⟳ Rotate
                </button>
                <button onClick={switchShapeOfSelected} disabled={!canSwitchShape} className={toolbarButton}>
                    ✨ Switch Shape
                </button>
                <button
                    onClick={() => { setShips(createDefaultFleet()); setSelectedId(null); }}
                    className={toolbarButton}
                >
                    ↺ Reset
                </button>
            </div>

            {/* touch-none stops the page scrolling while dragging on mobile */}
            <div
                ref={gridRef}
                className="inline-grid grid-cols-10 gap-0 border border-gray-500 touch-none select-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                {Array.from({ length: GRID_SIZE }, (_, row) =>
                    Array.from({ length: GRID_SIZE }, (_, col) => {
                        const shipId = cellOwner.get(`${row},${col}`);
                        const isShip = shipId !== undefined;
                        const isInvalid = isShip && invalidIds.has(shipId);
                        const isSelected = isShip && shipId === selectedId;
                        const shipColor = isInvalid
                            ? (isSelected ? 'bg-rose-500' : 'bg-rose-300')
                            : (isSelected ? 'bg-cyan-500' : 'bg-gray-400');
                        return (
                            <div
                                key={`${row}-${col}`}
                                className={`w-8 h-8 sm:w-10 sm:h-10 border border-gray-500 transition-colors ${
                                    isShip ? `${shipColor} cursor-grab` : ''
                                }`}
                            />
                        );
                    })
                )}
            </div>

            <div className="text-xs text-gray-500 h-4">
                {selectedShip
                    ? `Selected: ${selectedShip.type} (${selectedShip.cells.length} ${selectedShip.cells.length === 1 ? 'cell' : 'cells'})`
                    : 'Tap a ship to select it.'}
            </div>

            <div className="flex flex-row gap-3">
                <button
                    onClick={onCancel}
                    className="text-l py-1 px-3 rounded-full bg-white shadow-sm font-poppins font-semibold text-gray-500 hover:text-gray-400 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={() => onStart(toShipLayout(ships))}
                    disabled={!isFleetValid}
                    className="text-l py-1 px-3 rounded-full bg-amber-300 hover:bg-amber-100 shadow-sm
                        font-poppins font-semibold text-cyan-700 hover:text-cyan-600 transition-colors
                        disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    Start Battle
                </button>
            </div>
            {!isFleetValid && (
                <div className="text-xs text-rose-500 font-semibold">
                    Ships in red are touching or overlapping — move them apart to start.
                </div>
            )}
        </div>
    );
};

export default FleetBuilder;
