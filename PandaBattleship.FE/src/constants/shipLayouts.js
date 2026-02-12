export const SHIP_LAYOUTS = [
  {
    name: "Lithuanian Classic",
    ships: [
      // 1 ship of 4 cells (Straight - placed horizontally)
      { type: 'Battleship', coords: [[1, 1], [1, 2], [1, 3], [1, 4]] },
      // 2 ships of 3 cells
      { type: 'Cruiser', coords: [[3, 6], [4, 6], [4, 7]] }, // L-shape
      { type: 'Cruiser', coords: [[8, 1], [8, 2], [8, 3]] }, // Straight
      // 3 ships of 2 cells
      { type: 'Destroyer', coords: [[0, 8], [0, 9]] },
      { type: 'Destroyer', coords: [[4, 2], [5, 2]] },
      { type: 'Destroyer', coords: [[6, 8], [7, 8]] },
      // 4 ships of 1 cell
      { type: 'Submarine', coords: [[3, 4]] },
      { type: 'Submarine', coords: [[6, 0]] },
      { type: 'Submarine', coords: [[9, 6]] },
      { type: 'Submarine', coords: [[9, 9]] }
    ]
  },
  {
    name: "Lithuanian Tetris",
    ships: [
      // 1 ship of 4 cells (T-shape)
      { type: 'Battleship', coords: [[1, 1], [1, 2], [1, 3], [2, 2]] },
      // 2 ships of 3 cells
      { type: 'Cruiser', coords: [[4, 4], [5, 4], [5, 5]] }, // L-shape
      { type: 'Cruiser', coords: [[7, 7], [8, 7], [8, 8]] }, // L-shape
      // 3 ships of 2 cells
      { type: 'Destroyer', coords: [[0, 5], [0, 6]] },
      { type: 'Destroyer', coords: [[3, 0], [4, 0]] },
      { type: 'Destroyer', coords: [[9, 2], [9, 3]] },
      // 4 ships of 1 cell
      { type: 'Submarine', coords: [[0, 9]] },
      { type: 'Submarine', coords: [[2, 7]] },
      { type: 'Submarine', coords: [[6, 1]] },
      { type: 'Submarine', coords: [[8, 5]] }
    ]
  },
  {
    name: "Lithuanian ZigZag",
    ships: [
      // 1 ship of 4 cells (Z-shape)
      { type: 'Battleship', coords: [[5, 5], [5, 6], [6, 6], [6, 7]] },
      // 2 ships of 3 cells
      { type: 'Cruiser', coords: [[2, 1], [3, 1], [3, 2]] },
      { type: 'Cruiser', coords: [[8, 1], [8, 2], [9, 2]] },
      // 3 ships of 2 cells
      { type: 'Destroyer', coords: [[0, 3], [0, 4]] },
      { type: 'Destroyer', coords: [[3, 8], [4, 8]] },
      { type: 'Destroyer', coords: [[7, 4], [8, 4]] },
      // 4 ships of 1 cell
      { type: 'Submarine', coords: [[0, 0]] },
      { type: 'Submarine', coords: [[2, 5]] },
      { type: 'Submarine', coords: [[5, 2]] },
      { type: 'Submarine', coords: [[9, 9]] }
    ]
  },
  {
    name: "Lithuanian Perimeter",
    ships: [
      // 1 ship of 4 cells (Square)
      { type: 'Battleship', coords: [[0, 0], [0, 1], [1, 0], [1, 1]] },
      // 2 ships of 3 cells
      { type: 'Cruiser', coords: [[0, 4], [0, 5], [0, 6]] },
      { type: 'Cruiser', coords: [[0, 9], [1, 9], [2, 9]] },
      // 3 ships of 2 cells
      { type: 'Destroyer', coords: [[4, 0], [5, 0]] },
      { type: 'Destroyer', coords: [[9, 0], [9, 1]] },
      { type: 'Destroyer', coords: [[9, 5], [9, 6]] },
      // 4 ships of 1 cell
      { type: 'Submarine', coords: [[4, 4]] },
      { type: 'Submarine', coords: [[4, 7]] },
      { type: 'Submarine', coords: [[7, 4]] },
      { type: 'Submarine', coords: [[7, 9]] }
    ]
  },
  {
    name: "Lithuanian Snake",
    ships: [
      // 1 ship of 4 cells (Z-shape)
      { type: 'Battleship', coords: [[2, 2], [3, 2], [3, 3], [4, 3]] },
      // 2 ships of 3 cells
      { type: 'Cruiser', coords: [[0, 0], [1, 0], [2, 0]] },
      { type: 'Cruiser', coords: [[6, 6], [6, 7], [7, 7]] }, // L-shape
      // 3 ships of 2 cells
      { type: 'Destroyer', coords: [[0, 5], [0, 6]] },
      { type: 'Destroyer', coords: [[4, 0], [5, 0]] },
      { type: 'Destroyer', coords: [[9, 3], [9, 4]] },
      // 4 ships of 1 cell
      { type: 'Submarine', coords: [[0, 3]] },
      { type: 'Submarine', coords: [[2, 5]] },
      { type: 'Submarine', coords: [[4, 6]] },
      { type: 'Submarine', coords: [[8, 1]] }
    ]
  },
  {
    name: "Lithuanian Scattered",
    ships: [
      // 1 ship of 4 cells (L-shape)
      { type: 'Battleship', coords: [[1, 1], [2, 1], [2, 2], [2, 3]] },
      // 2 ships of 3 cells
      { type: 'Cruiser', coords: [[5, 1], [6, 1], [7, 1]] },
      { type: 'Cruiser', coords: [[1, 5], [1, 6], [2, 6]] }, // L-shape
      // 3 ships of 2 cells
      { type: 'Destroyer', coords: [[4, 4], [4, 5]] },
      { type: 'Destroyer', coords: [[7, 4], [8, 4]] },
      { type: 'Destroyer', coords: [[4, 8], [5, 8]] },
      // 4 ships of 1 cell
      { type: 'Submarine', coords: [[0, 9]] },
      { type: 'Submarine', coords: [[9, 0]] },
      { type: 'Submarine', coords: [[9, 9]] },
      { type: 'Submarine', coords: [[7, 7]] }
    ]
  }
];