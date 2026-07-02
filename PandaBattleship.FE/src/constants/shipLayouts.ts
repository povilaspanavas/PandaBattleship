import type { ShipLayout } from "../types/SinglePlayerGame";

export const SHIP_LAYOUTS: ShipLayout[] = [
  {
    "name": "Lithuanian Classic",
    "ships": [
      { "type": "Battleship", "coords": [[1, 1], [1, 2], [1, 3], [1, 4]] },
      { "type": "Cruiser", "coords": [[3, 6], [4, 6], [4, 7]] },
      { "type": "Cruiser", "coords": [[8, 1], [8, 2], [8, 3]] },
      { "type": "Destroyer", "coords": [[0, 8], [0, 9]] },
      { "type": "Destroyer", "coords": [[4, 2], [5, 2]] },
      { "type": "Destroyer", "coords": [[6, 8], [7, 8]] },
      { "type": "Submarine", "coords": [[3, 4]] },
      { "type": "Submarine", "coords": [[6, 0]] },
      { "type": "Submarine", "coords": [[9, 6]] },
      { "type": "Submarine", "coords": [[9, 9]] }
    ]
  },
  {
    "name": "Lithuanian Tetris",
    "ships": [
      { "type": "Battleship", "coords": [[1, 1], [1, 2], [1, 3], [2, 2]] },
      { "type": "Cruiser", "coords": [[4, 4], [5, 4], [5, 5]] },
      { "type": "Cruiser", "coords": [[7, 7], [8, 7], [8, 8]] },
      { "type": "Destroyer", "coords": [[0, 5], [0, 6]] },
      { "type": "Destroyer", "coords": [[3, 0], [4, 0]] },
      { "type": "Destroyer", "coords": [[9, 2], [9, 3]] },
      { "type": "Submarine", "coords": [[0, 9]] },
      { "type": "Submarine", "coords": [[2, 7]] },
      { "type": "Submarine", "coords": [[6, 1]] },
      { "type": "Submarine", "coords": [[8, 5]] }
    ]
  },
  {
    "name": "Lithuanian ZigZag",
    "ships": [
      { "type": "Battleship", "coords": [[5, 5], [5, 6], [6, 6], [6, 7]] },
      { "type": "Cruiser", "coords": [[2, 1], [3, 1], [3, 2]] },
      { "type": "Cruiser", "coords": [[8, 1], [8, 2], [9, 2]] },
      { "type": "Destroyer", "coords": [[0, 3], [0, 4]] },
      { "type": "Destroyer", "coords": [[3, 8], [4, 8]] },
      { "type": "Destroyer", "coords": [[7, 4], [8, 4]] },
      { "type": "Submarine", "coords": [[0, 0]] },
      { "type": "Submarine", "coords": [[2, 5]] },
      { "type": "Submarine", "coords": [[5, 2]] },
      { "type": "Submarine", "coords": [[9, 9]] }
    ]
  },
  {
    "name": "Lithuanian Perimeter",
    "ships": [
      { "type": "Battleship", "coords": [[0, 0], [0, 1], [1, 0], [1, 1]] },
      { "type": "Cruiser", "coords": [[0, 4], [0, 5], [0, 6]] },
      { "type": "Cruiser", "coords": [[0, 9], [1, 9], [2, 9]] },
      { "type": "Destroyer", "coords": [[4, 0], [5, 0]] },
      { "type": "Destroyer", "coords": [[9, 0], [9, 1]] },
      { "type": "Destroyer", "coords": [[9, 5], [9, 6]] },
      { "type": "Submarine", "coords": [[4, 4]] },
      { "type": "Submarine", "coords": [[4, 7]] },
      { "type": "Submarine", "coords": [[7, 4]] },
      { "type": "Submarine", "coords": [[7, 9]] }
    ]
  },
  {
    "name": "Lithuanian Snake",
    "ships": [
      { "type": "Battleship", "coords": [[2, 2], [3, 2], [3, 3], [4, 3]] },
      { "type": "Cruiser", "coords": [[0, 0], [1, 0], [2, 0]] },
      { "type": "Cruiser", "coords": [[6, 6], [6, 7], [7, 7]] },
      { "type": "Destroyer", "coords": [[0, 5], [0, 6]] },
      { "type": "Destroyer", "coords": [[4, 0], [5, 0]] },
      { "type": "Destroyer", "coords": [[9, 3], [9, 4]] },
      { "type": "Submarine", "coords": [[0, 3]] },
      { "type": "Submarine", "coords": [[2, 5]] },
      { "type": "Submarine", "coords": [[4, 6]] },
      { "type": "Submarine", "coords": [[8, 1]] }
    ]
  },
  {
    "name": "Lithuanian Scattered",
    "ships": [
      { "type": "Battleship", "coords": [[1, 1], [2, 1], [2, 2], [2, 3]] },
      { "type": "Cruiser", "coords": [[5, 1], [6, 1], [7, 1]] },
      { "type": "Cruiser", "coords": [[1, 5], [1, 6], [2, 6]] },
      { "type": "Destroyer", "coords": [[4, 4], [4, 5]] },
      { "type": "Destroyer", "coords": [[7, 4], [8, 4]] },
      { "type": "Destroyer", "coords": [[4, 8], [5, 8]] },
      { "type": "Submarine", "coords": [[0, 9]] },
      { "type": "Submarine", "coords": [[9, 0]] },
      { "type": "Submarine", "coords": [[9, 9]] },
      { "type": "Submarine", "coords": [[7, 7]] }
    ]
  },
  {
    "name": "Lithuanian Layout 001",
    "ships": [
      { "type": "Battleship", "coords": [[1, 6], [2, 6], [3, 6], [4, 6]] },
      { "type": "Cruiser", "coords": [[5, 1], [5, 2], [5, 3]] },
      { "type": "Cruiser", "coords": [[8, 7], [9, 7], [9, 8]] },
      { "type": "Destroyer", "coords": [[8, 4], [8, 5]] },
      { "type": "Destroyer", "coords": [[1, 0], [2, 0]] },
      { "type": "Destroyer", "coords": [[1, 2], [1, 3]] },
      { "type": "Submarine", "coords": [[7, 1]] },
      { "type": "Submarine", "coords": [[5, 9]] },
      { "type": "Submarine", "coords": [[2, 9]] },
      { "type": "Submarine", "coords": [[3, 2]] }
    ]
  },
  {
    "name": "Lithuanian Layout 002",
    "ships": [
      { "type": "Battleship", "coords": [[3, 2], [4, 2], [4, 3], [5, 3]] },
      { "type": "Cruiser", "coords": [[0, 3], [0, 4], [1, 3]] },
      { "type": "Cruiser", "coords": [[0, 6], [1, 6], [2, 6]] },
      { "type": "Destroyer", "coords": [[4, 7], [4, 8]] },
      { "type": "Destroyer", "coords": [[8, 6], [8, 7]] },
      { "type": "Destroyer", "coords": [[6, 9], [7, 9]] },
      { "type": "Submarine", "coords": [[7, 0]] },
      { "type": "Submarine", "coords": [[6, 5]] },
      { "type": "Submarine", "coords": [[5, 0]] },
      { "type": "Submarine", "coords": [[0, 8]] }
    ]
  },
  {
    "name": "Lithuanian Layout 003",
    "ships": [
      { "type": "Battleship", "coords": [[2, 8], [3, 8], [3, 9], [4, 9]] },
      { "type": "Cruiser", "coords": [[3, 4], [3, 5], [4, 5]] },
      { "type": "Cruiser", "coords": [[3, 2], [4, 2], [5, 2]] },
      { "type": "Destroyer", "coords": [[0, 3], [0, 4]] },
      { "type": "Destroyer", "coords": [[8, 4], [9, 4]] },
      { "type": "Destroyer", "coords": [[6, 8], [7, 8]] },
      { "type": "Submarine", "coords": [[3, 0]] },
      { "type": "Submarine", "coords": [[7, 1]] },
      { "type": "Submarine", "coords": [[0, 8]] },
      { "type": "Submarine", "coords": [[9, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 004",
    "ships": [
      { "type": "Battleship", "coords": [[0, 5], [0, 6], [0, 7], [1, 7]] },
      { "type": "Cruiser", "coords": [[5, 7], [5, 8], [5, 9]] },
      { "type": "Cruiser", "coords": [[2, 4], [3, 3], [3, 4]] },
      { "type": "Destroyer", "coords": [[8, 1], [8, 2]] },
      { "type": "Destroyer", "coords": [[3, 6], [3, 7]] },
      { "type": "Destroyer", "coords": [[0, 1], [0, 2]] },
      { "type": "Submarine", "coords": [[8, 9]] },
      { "type": "Submarine", "coords": [[0, 9]] },
      { "type": "Submarine", "coords": [[9, 7]] },
      { "type": "Submarine", "coords": [[3, 1]] }
    ]
  },
  {
    "name": "Lithuanian Layout 005",
    "ships": [
      { "type": "Battleship", "coords": [[5, 6], [5, 7], [6, 6], [6, 7]] },
      { "type": "Cruiser", "coords": [[1, 4], [1, 5], [2, 4]] },
      { "type": "Cruiser", "coords": [[4, 2], [4, 3], [5, 2]] },
      { "type": "Destroyer", "coords": [[0, 8], [1, 8]] },
      { "type": "Destroyer", "coords": [[8, 9], [9, 9]] },
      { "type": "Destroyer", "coords": [[7, 3], [8, 3]] },
      { "type": "Submarine", "coords": [[2, 2]] },
      { "type": "Submarine", "coords": [[6, 9]] },
      { "type": "Submarine", "coords": [[3, 0]] },
      { "type": "Submarine", "coords": [[9, 5]] }
    ]
  },
  {
    "name": "Lithuanian Layout 006",
    "ships": [
      { "type": "Battleship", "coords": [[8, 1], [8, 2], [9, 1], [9, 2]] },
      { "type": "Cruiser", "coords": [[0, 1], [0, 2], [0, 3]] },
      { "type": "Cruiser", "coords": [[5, 7], [6, 7], [7, 7]] },
      { "type": "Destroyer", "coords": [[5, 4], [5, 5]] },
      { "type": "Destroyer", "coords": [[5, 9], [6, 9]] },
      { "type": "Destroyer", "coords": [[9, 7], [9, 8]] },
      { "type": "Submarine", "coords": [[3, 8]] },
      { "type": "Submarine", "coords": [[2, 5]] },
      { "type": "Submarine", "coords": [[6, 1]] },
      { "type": "Submarine", "coords": [[1, 7]] }
    ]
  },
  {
    "name": "Lithuanian Layout 007",
    "ships": [
      { "type": "Battleship", "coords": [[5, 2], [6, 2], [6, 3], [7, 2]] },
      { "type": "Cruiser", "coords": [[2, 7], [3, 7], [4, 7]] },
      { "type": "Cruiser", "coords": [[8, 4], [9, 4], [9, 5]] },
      { "type": "Destroyer", "coords": [[1, 4], [1, 5]] },
      { "type": "Destroyer", "coords": [[9, 0], [9, 1]] },
      { "type": "Destroyer", "coords": [[8, 7], [9, 7]] },
      { "type": "Submarine", "coords": [[6, 7]] },
      { "type": "Submarine", "coords": [[0, 7]] },
      { "type": "Submarine", "coords": [[5, 0]] },
      { "type": "Submarine", "coords": [[0, 2]] }
    ]
  },
  {
    "name": "Lithuanian Layout 008",
    "ships": [
      { "type": "Battleship", "coords": [[3, 4], [3, 5], [3, 6], [4, 5]] },
      { "type": "Cruiser", "coords": [[8, 2], [8, 3], [8, 4]] },
      { "type": "Cruiser", "coords": [[7, 8], [8, 8], [9, 8]] },
      { "type": "Destroyer", "coords": [[7, 6], [8, 6]] },
      { "type": "Destroyer", "coords": [[5, 2], [5, 3]] },
      { "type": "Destroyer", "coords": [[3, 9], [4, 9]] },
      { "type": "Submarine", "coords": [[0, 3]] },
      { "type": "Submarine", "coords": [[0, 7]] },
      { "type": "Submarine", "coords": [[0, 9]] },
      { "type": "Submarine", "coords": [[5, 7]] }
    ]
  },
  {
    "name": "Lithuanian Layout 009",
    "ships": [
      { "type": "Battleship", "coords": [[0, 1], [1, 0], [1, 1], [2, 1]] },
      { "type": "Cruiser", "coords": [[7, 3], [7, 4], [8, 4]] },
      { "type": "Cruiser", "coords": [[9, 6], [9, 7], [9, 8]] },
      { "type": "Destroyer", "coords": [[1, 9], [2, 9]] },
      { "type": "Destroyer", "coords": [[5, 7], [6, 7]] },
      { "type": "Destroyer", "coords": [[8, 1], [9, 1]] },
      { "type": "Submarine", "coords": [[4, 0]] },
      { "type": "Submarine", "coords": [[5, 3]] },
      { "type": "Submarine", "coords": [[6, 9]] },
      { "type": "Submarine", "coords": [[6, 1]] }
    ]
  },
  {
    "name": "Lithuanian Layout 010",
    "ships": [
      { "type": "Battleship", "coords": [[0, 2], [1, 0], [1, 1], [1, 2]] },
      { "type": "Cruiser", "coords": [[7, 1], [8, 0], [8, 1]] },
      { "type": "Cruiser", "coords": [[2, 9], [3, 9], [4, 9]] },
      { "type": "Destroyer", "coords": [[6, 5], [6, 6]] },
      { "type": "Destroyer", "coords": [[5, 0], [5, 1]] },
      { "type": "Destroyer", "coords": [[3, 7], [4, 7]] },
      { "type": "Submarine", "coords": [[9, 5]] },
      { "type": "Submarine", "coords": [[8, 9]] },
      { "type": "Submarine", "coords": [[0, 7]] },
      { "type": "Submarine", "coords": [[9, 3]] }
    ]
  },
  {
    "name": "Lithuanian Layout 011",
    "ships": [
      { "type": "Battleship", "coords": [[3, 2], [3, 3], [4, 2], [4, 3]] },
      { "type": "Cruiser", "coords": [[0, 2], [0, 3], [1, 2]] },
      { "type": "Cruiser", "coords": [[7, 4], [7, 5], [8, 5]] },
      { "type": "Destroyer", "coords": [[4, 6], [4, 7]] },
      { "type": "Destroyer", "coords": [[1, 5], [1, 6]] },
      { "type": "Destroyer", "coords": [[8, 1], [9, 1]] },
      { "type": "Submarine", "coords": [[6, 0]] },
      { "type": "Submarine", "coords": [[6, 8]] },
      { "type": "Submarine", "coords": [[4, 0]] },
      { "type": "Submarine", "coords": [[0, 9]] }
    ]
  },
  {
    "name": "Lithuanian Layout 012",
    "ships": [
      { "type": "Battleship", "coords": [[4, 6], [5, 6], [5, 7], [6, 6]] },
      { "type": "Cruiser", "coords": [[7, 3], [8, 2], [8, 3]] },
      { "type": "Cruiser", "coords": [[0, 1], [1, 1], [1, 2]] },
      { "type": "Destroyer", "coords": [[8, 5], [8, 6]] },
      { "type": "Destroyer", "coords": [[2, 7], [2, 8]] },
      { "type": "Destroyer", "coords": [[3, 0], [4, 0]] },
      { "type": "Submarine", "coords": [[5, 9]] },
      { "type": "Submarine", "coords": [[4, 3]] },
      { "type": "Submarine", "coords": [[0, 9]] },
      { "type": "Submarine", "coords": [[2, 4]] }
    ]
  },
  {
    "name": "Lithuanian Layout 013",
    "ships": [
      { "type": "Battleship", "coords": [[5, 1], [5, 2], [6, 2], [6, 3]] },
      { "type": "Cruiser", "coords": [[0, 4], [0, 5], [1, 4]] },
      { "type": "Cruiser", "coords": [[2, 1], [3, 0], [3, 1]] },
      { "type": "Destroyer", "coords": [[0, 9], [1, 9]] },
      { "type": "Destroyer", "coords": [[9, 6], [9, 7]] },
      { "type": "Destroyer", "coords": [[6, 7], [6, 8]] },
      { "type": "Submarine", "coords": [[1, 7]] },
      { "type": "Submarine", "coords": [[3, 6]] },
      { "type": "Submarine", "coords": [[7, 0]] },
      { "type": "Submarine", "coords": [[8, 3]] }
    ]
  },
  {
    "name": "Lithuanian Layout 014",
    "ships": [
      { "type": "Battleship", "coords": [[7, 8], [8, 8], [8, 9], [9, 9]] },
      { "type": "Cruiser", "coords": [[2, 3], [3, 3], [3, 4]] },
      { "type": "Cruiser", "coords": [[6, 1], [6, 2], [7, 1]] },
      { "type": "Destroyer", "coords": [[0, 0], [1, 0]] },
      { "type": "Destroyer", "coords": [[0, 7], [0, 8]] },
      { "type": "Destroyer", "coords": [[5, 4], [5, 5]] },
      { "type": "Submarine", "coords": [[7, 5]] },
      { "type": "Submarine", "coords": [[9, 1]] },
      { "type": "Submarine", "coords": [[2, 6]] },
      { "type": "Submarine", "coords": [[4, 1]] }
    ]
  },
  {
    "name": "Lithuanian Layout 015",
    "ships": [
      { "type": "Battleship", "coords": [[4, 7], [4, 8], [4, 9], [5, 7]] },
      { "type": "Cruiser", "coords": [[7, 4], [7, 5], [8, 4]] },
      { "type": "Cruiser", "coords": [[0, 7], [1, 6], [1, 7]] },
      { "type": "Destroyer", "coords": [[9, 0], [9, 1]] },
      { "type": "Destroyer", "coords": [[4, 2], [5, 2]] },
      { "type": "Destroyer", "coords": [[4, 4], [4, 5]] },
      { "type": "Submarine", "coords": [[9, 8]] },
      { "type": "Submarine", "coords": [[7, 0]] },
      { "type": "Submarine", "coords": [[2, 3]] },
      { "type": "Submarine", "coords": [[2, 1]] }
    ]
  },
  {
    "name": "Lithuanian Layout 016",
    "ships": [
      { "type": "Battleship", "coords": [[1, 1], [1, 2], [1, 3], [2, 1]] },
      { "type": "Cruiser", "coords": [[5, 5], [5, 6], [6, 5]] },
      { "type": "Cruiser", "coords": [[8, 6], [9, 6], [9, 7]] },
      { "type": "Destroyer", "coords": [[3, 6], [3, 7]] },
      { "type": "Destroyer", "coords": [[6, 1], [7, 1]] },
      { "type": "Destroyer", "coords": [[1, 6], [1, 7]] },
      { "type": "Submarine", "coords": [[9, 9]] },
      { "type": "Submarine", "coords": [[7, 9]] },
      { "type": "Submarine", "coords": [[5, 3]] },
      { "type": "Submarine", "coords": [[5, 9]] }
    ]
  },
  {
    "name": "Lithuanian Layout 017",
    "ships": [
      { "type": "Battleship", "coords": [[3, 7], [3, 8], [4, 8], [4, 9]] },
      { "type": "Cruiser", "coords": [[5, 4], [5, 5], [6, 4]] },
      { "type": "Cruiser", "coords": [[0, 2], [1, 1], [1, 2]] },
      { "type": "Destroyer", "coords": [[6, 7], [7, 7]] },
      { "type": "Destroyer", "coords": [[7, 1], [7, 2]] },
      { "type": "Destroyer", "coords": [[9, 6], [9, 7]] },
      { "type": "Submarine", "coords": [[9, 4]] },
      { "type": "Submarine", "coords": [[4, 2]] },
      { "type": "Submarine", "coords": [[3, 4]] },
      { "type": "Submarine", "coords": [[7, 9]] }
    ]
  },
  {
    "name": "Lithuanian Layout 018",
    "ships": [
      { "type": "Battleship", "coords": [[3, 0], [4, 0], [4, 1], [5, 1]] },
      { "type": "Cruiser", "coords": [[5, 4], [5, 5], [6, 4]] },
      { "type": "Cruiser", "coords": [[1, 2], [1, 3], [1, 4]] },
      { "type": "Destroyer", "coords": [[4, 7], [5, 7]] },
      { "type": "Destroyer", "coords": [[7, 7], [7, 8]] },
      { "type": "Destroyer", "coords": [[8, 1], [8, 2]] },
      { "type": "Submarine", "coords": [[3, 9]] },
      { "type": "Submarine", "coords": [[2, 6]] },
      { "type": "Submarine", "coords": [[1, 0]] },
      { "type": "Submarine", "coords": [[8, 4]] }
    ]
  },
  {
    "name": "Lithuanian Layout 019",
    "ships": [
      { "type": "Battleship", "coords": [[7, 6], [8, 6], [8, 7], [9, 7]] },
      { "type": "Cruiser", "coords": [[0, 1], [1, 0], [1, 1]] },
      { "type": "Cruiser", "coords": [[7, 3], [7, 4], [8, 3]] },
      { "type": "Destroyer", "coords": [[5, 0], [6, 0]] },
      { "type": "Destroyer", "coords": [[3, 4], [3, 5]] },
      { "type": "Destroyer", "coords": [[0, 8], [1, 8]] },
      { "type": "Submarine", "coords": [[3, 9]] },
      { "type": "Submarine", "coords": [[3, 7]] },
      { "type": "Submarine", "coords": [[3, 0]] },
      { "type": "Submarine", "coords": [[0, 3]] }
    ]
  },
  {
    "name": "Lithuanian Layout 020",
    "ships": [
      { "type": "Battleship", "coords": [[4, 7], [4, 8], [5, 6], [5, 7]] },
      { "type": "Cruiser", "coords": [[3, 0], [3, 1], [4, 1]] },
      { "type": "Cruiser", "coords": [[0, 8], [0, 9], [1, 8]] },
      { "type": "Destroyer", "coords": [[0, 5], [0, 6]] },
      { "type": "Destroyer", "coords": [[7, 2], [8, 2]] },
      { "type": "Destroyer", "coords": [[3, 4], [3, 5]] },
      { "type": "Submarine", "coords": [[8, 5]] },
      { "type": "Submarine", "coords": [[6, 9]] },
      { "type": "Submarine", "coords": [[7, 7]] },
      { "type": "Submarine", "coords": [[6, 4]] }
    ]
  },
  {
    "name": "Lithuanian Layout 021",
    "ships": [
      { "type": "Battleship", "coords": [[0, 1], [1, 1], [1, 2], [2, 1]] },
      { "type": "Cruiser", "coords": [[6, 8], [6, 9], [7, 8]] },
      { "type": "Cruiser", "coords": [[5, 3], [5, 4], [6, 4]] },
      { "type": "Destroyer", "coords": [[8, 2], [8, 3]] },
      { "type": "Destroyer", "coords": [[2, 7], [3, 7]] },
      { "type": "Destroyer", "coords": [[0, 4], [1, 4]] },
      { "type": "Submarine", "coords": [[6, 0]] },
      { "type": "Submarine", "coords": [[5, 6]] },
      { "type": "Submarine", "coords": [[4, 0]] },
      { "type": "Submarine", "coords": [[8, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 022",
    "ships": [
      { "type": "Battleship", "coords": [[1, 5], [1, 6], [1, 7], [2, 6]] },
      { "type": "Cruiser", "coords": [[4, 5], [4, 6], [5, 6]] },
      { "type": "Cruiser", "coords": [[7, 0], [7, 1], [7, 2]] },
      { "type": "Destroyer", "coords": [[0, 2], [0, 3]] },
      { "type": "Destroyer", "coords": [[7, 6], [8, 6]] },
      { "type": "Destroyer", "coords": [[8, 9], [9, 9]] },
      { "type": "Submarine", "coords": [[4, 1]] },
      { "type": "Submarine", "coords": [[1, 9]] },
      { "type": "Submarine", "coords": [[4, 9]] },
      { "type": "Submarine", "coords": [[9, 1]] }
    ]
  },
  {
    "name": "Lithuanian Layout 023",
    "ships": [
      { "type": "Battleship", "coords": [[5, 4], [5, 5], [6, 5], [7, 5]] },
      { "type": "Cruiser", "coords": [[8, 7], [9, 6], [9, 7]] },
      { "type": "Cruiser", "coords": [[5, 7], [5, 8], [5, 9]] },
      { "type": "Destroyer", "coords": [[1, 4], [1, 5]] },
      { "type": "Destroyer", "coords": [[3, 1], [4, 1]] },
      { "type": "Destroyer", "coords": [[2, 7], [2, 8]] },
      { "type": "Submarine", "coords": [[1, 0]] },
      { "type": "Submarine", "coords": [[0, 2]] },
      { "type": "Submarine", "coords": [[6, 1]] },
      { "type": "Submarine", "coords": [[9, 3]] }
    ]
  },
  {
    "name": "Lithuanian Layout 024",
    "ships": [
      { "type": "Battleship", "coords": [[8, 8], [8, 9], [9, 8], [9, 9]] },
      { "type": "Cruiser", "coords": [[1, 3], [2, 3], [3, 3]] },
      { "type": "Cruiser", "coords": [[4, 5], [5, 4], [5, 5]] },
      { "type": "Destroyer", "coords": [[1, 9], [2, 9]] },
      { "type": "Destroyer", "coords": [[8, 1], [8, 2]] },
      { "type": "Destroyer", "coords": [[7, 5], [8, 5]] },
      { "type": "Submarine", "coords": [[3, 7]] },
      { "type": "Submarine", "coords": [[6, 7]] },
      { "type": "Submarine", "coords": [[1, 7]] },
      { "type": "Submarine", "coords": [[3, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 025",
    "ships": [
      { "type": "Battleship", "coords": [[5, 6], [5, 7], [5, 8], [6, 8]] },
      { "type": "Cruiser", "coords": [[1, 4], [2, 4], [3, 4]] },
      { "type": "Cruiser", "coords": [[7, 4], [8, 4], [8, 5]] },
      { "type": "Destroyer", "coords": [[0, 2], [1, 2]] },
      { "type": "Destroyer", "coords": [[7, 0], [8, 0]] },
      { "type": "Destroyer", "coords": [[8, 9], [9, 9]] },
      { "type": "Submarine", "coords": [[3, 6]] },
      { "type": "Submarine", "coords": [[3, 1]] },
      { "type": "Submarine", "coords": [[0, 9]] },
      { "type": "Submarine", "coords": [[1, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 026",
    "ships": [
      { "type": "Battleship", "coords": [[6, 6], [6, 7], [6, 8], [7, 6]] },
      { "type": "Cruiser", "coords": [[2, 8], [3, 8], [4, 8]] },
      { "type": "Cruiser", "coords": [[0, 2], [1, 2], [2, 2]] },
      { "type": "Destroyer", "coords": [[4, 1], [5, 1]] },
      { "type": "Destroyer", "coords": [[9, 0], [9, 1]] },
      { "type": "Destroyer", "coords": [[0, 6], [0, 7]] },
      { "type": "Submarine", "coords": [[9, 3]] },
      { "type": "Submarine", "coords": [[5, 3]] },
      { "type": "Submarine", "coords": [[2, 6]] },
      { "type": "Submarine", "coords": [[2, 4]] }
    ]
  },
  {
    "name": "Lithuanian Layout 027",
    "ships": [
      { "type": "Battleship", "coords": [[3, 3], [3, 4], [4, 3], [4, 4]] },
      { "type": "Cruiser", "coords": [[0, 8], [1, 7], [1, 8]] },
      { "type": "Cruiser", "coords": [[4, 8], [5, 8], [6, 8]] },
      { "type": "Destroyer", "coords": [[8, 5], [8, 6]] },
      { "type": "Destroyer", "coords": [[5, 6], [6, 6]] },
      { "type": "Destroyer", "coords": [[0, 3], [1, 3]] },
      { "type": "Submarine", "coords": [[9, 9]] },
      { "type": "Submarine", "coords": [[8, 2]] },
      { "type": "Submarine", "coords": [[4, 1]] },
      { "type": "Submarine", "coords": [[3, 6]] }
    ]
  },
  {
    "name": "Lithuanian Layout 028",
    "ships": [
      { "type": "Battleship", "coords": [[4, 1], [5, 1], [6, 0], [6, 1]] },
      { "type": "Cruiser", "coords": [[8, 1], [8, 2], [9, 2]] },
      { "type": "Cruiser", "coords": [[2, 6], [3, 6], [4, 6]] },
      { "type": "Destroyer", "coords": [[2, 4], [3, 4]] },
      { "type": "Destroyer", "coords": [[8, 5], [9, 5]] },
      { "type": "Destroyer", "coords": [[2, 8], [3, 8]] },
      { "type": "Submarine", "coords": [[7, 8]] },
      { "type": "Submarine", "coords": [[9, 9]] },
      { "type": "Submarine", "coords": [[0, 0]] },
      { "type": "Submarine", "coords": [[5, 3]] }
    ]
  },
  {
    "name": "Lithuanian Layout 029",
    "ships": [
      { "type": "Battleship", "coords": [[5, 0], [5, 1], [5, 2], [6, 1]] },
      { "type": "Cruiser", "coords": [[7, 3], [7, 4], [8, 4]] },
      { "type": "Cruiser", "coords": [[2, 9], [3, 8], [3, 9]] },
      { "type": "Destroyer", "coords": [[2, 1], [3, 1]] },
      { "type": "Destroyer", "coords": [[1, 4], [1, 5]] },
      { "type": "Destroyer", "coords": [[5, 7], [5, 8]] },
      { "type": "Submarine", "coords": [[3, 3]] },
      { "type": "Submarine", "coords": [[0, 8]] },
      { "type": "Submarine", "coords": [[7, 6]] },
      { "type": "Submarine", "coords": [[7, 8]] }
    ]
  },
  {
    "name": "Lithuanian Layout 030",
    "ships": [
      { "type": "Battleship", "coords": [[2, 6], [2, 7], [2, 8], [3, 8]] },
      { "type": "Cruiser", "coords": [[8, 1], [8, 2], [9, 1]] },
      { "type": "Cruiser", "coords": [[7, 4], [7, 5], [8, 5]] },
      { "type": "Destroyer", "coords": [[0, 4], [0, 5]] },
      { "type": "Destroyer", "coords": [[2, 4], [3, 4]] },
      { "type": "Destroyer", "coords": [[5, 5], [5, 6]] },
      { "type": "Submarine", "coords": [[8, 7]] },
      { "type": "Submarine", "coords": [[6, 2]] },
      { "type": "Submarine", "coords": [[1, 2]] },
      { "type": "Submarine", "coords": [[6, 8]] }
    ]
  },
  {
    "name": "Lithuanian Layout 031",
    "ships": [
      { "type": "Battleship", "coords": [[7, 8], [8, 7], [8, 8], [9, 7]] },
      { "type": "Cruiser", "coords": [[2, 3], [2, 4], [3, 3]] },
      { "type": "Cruiser", "coords": [[0, 7], [1, 7], [1, 8]] },
      { "type": "Destroyer", "coords": [[5, 3], [5, 4]] },
      { "type": "Destroyer", "coords": [[7, 4], [8, 4]] },
      { "type": "Destroyer", "coords": [[2, 0], [2, 1]] },
      { "type": "Submarine", "coords": [[3, 6]] },
      { "type": "Submarine", "coords": [[0, 5]] },
      { "type": "Submarine", "coords": [[7, 1]] },
      { "type": "Submarine", "coords": [[5, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 032",
    "ships": [
      { "type": "Battleship", "coords": [[4, 1], [4, 2], [5, 2], [6, 2]] },
      { "type": "Cruiser", "coords": [[8, 3], [8, 4], [9, 4]] },
      { "type": "Cruiser", "coords": [[5, 5], [5, 6], [6, 6]] },
      { "type": "Destroyer", "coords": [[0, 7], [1, 7]] },
      { "type": "Destroyer", "coords": [[6, 8], [6, 9]] },
      { "type": "Destroyer", "coords": [[2, 2], [2, 3]] },
      { "type": "Submarine", "coords": [[8, 0]] },
      { "type": "Submarine", "coords": [[3, 7]] },
      { "type": "Submarine", "coords": [[4, 9]] },
      { "type": "Submarine", "coords": [[0, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 033",
    "ships": [
      { "type": "Battleship", "coords": [[1, 0], [1, 1], [2, 0], [2, 1]] },
      { "type": "Cruiser", "coords": [[4, 3], [4, 4], [5, 4]] },
      { "type": "Cruiser", "coords": [[1, 6], [1, 7], [2, 7]] },
      { "type": "Destroyer", "coords": [[1, 3], [1, 4]] },
      { "type": "Destroyer", "coords": [[7, 2], [7, 3]] },
      { "type": "Destroyer", "coords": [[6, 6], [6, 7]] },
      { "type": "Submarine", "coords": [[2, 9]] },
      { "type": "Submarine", "coords": [[5, 9]] },
      { "type": "Submarine", "coords": [[4, 0]] },
      { "type": "Submarine", "coords": [[7, 9]] }
    ]
  },
  {
    "name": "Lithuanian Layout 034",
    "ships": [
      { "type": "Battleship", "coords": [[2, 2], [3, 2], [4, 2], [4, 3]] },
      { "type": "Cruiser", "coords": [[3, 5], [4, 5], [5, 5]] },
      { "type": "Cruiser", "coords": [[5, 7], [5, 8], [6, 8]] },
      { "type": "Destroyer", "coords": [[2, 8], [3, 8]] },
      { "type": "Destroyer", "coords": [[9, 1], [9, 2]] },
      { "type": "Destroyer", "coords": [[8, 6], [9, 6]] },
      { "type": "Submarine", "coords": [[9, 8]] },
      { "type": "Submarine", "coords": [[1, 5]] },
      { "type": "Submarine", "coords": [[0, 8]] },
      { "type": "Submarine", "coords": [[6, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 035",
    "ships": [
      { "type": "Battleship", "coords": [[6, 3], [6, 4], [7, 3], [7, 4]] },
      { "type": "Cruiser", "coords": [[0, 3], [1, 3], [1, 4]] },
      { "type": "Cruiser", "coords": [[4, 8], [5, 7], [5, 8]] },
      { "type": "Destroyer", "coords": [[5, 0], [5, 1]] },
      { "type": "Destroyer", "coords": [[7, 0], [7, 1]] },
      { "type": "Destroyer", "coords": [[1, 7], [2, 7]] },
      { "type": "Submarine", "coords": [[8, 7]] },
      { "type": "Submarine", "coords": [[2, 9]] },
      { "type": "Submarine", "coords": [[4, 5]] },
      { "type": "Submarine", "coords": [[9, 4]] }
    ]
  },
  {
    "name": "Lithuanian Layout 036",
    "ships": [
      { "type": "Battleship", "coords": [[4, 9], [5, 8], [5, 9], [6, 9]] },
      { "type": "Cruiser", "coords": [[5, 0], [6, 0], [6, 1]] },
      { "type": "Cruiser", "coords": [[0, 0], [0, 1], [1, 0]] },
      { "type": "Destroyer", "coords": [[2, 2], [2, 3]] },
      { "type": "Destroyer", "coords": [[3, 5], [3, 6]] },
      { "type": "Destroyer", "coords": [[5, 3], [6, 3]] },
      { "type": "Submarine", "coords": [[8, 7]] },
      { "type": "Submarine", "coords": [[6, 5]] },
      { "type": "Submarine", "coords": [[9, 3]] },
      { "type": "Submarine", "coords": [[9, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 037",
    "ships": [
      { "type": "Battleship", "coords": [[7, 6], [8, 6], [8, 7], [8, 8]] },
      { "type": "Cruiser", "coords": [[0, 4], [0, 5], [1, 4]] },
      { "type": "Cruiser", "coords": [[5, 1], [5, 2], [6, 2]] },
      { "type": "Destroyer", "coords": [[3, 1], [3, 2]] },
      { "type": "Destroyer", "coords": [[3, 7], [3, 8]] },
      { "type": "Destroyer", "coords": [[0, 1], [0, 2]] },
      { "type": "Submarine", "coords": [[4, 5]] },
      { "type": "Submarine", "coords": [[6, 8]] },
      { "type": "Submarine", "coords": [[8, 0]] },
      { "type": "Submarine", "coords": [[1, 7]] }
    ]
  },
  {
    "name": "Lithuanian Layout 038",
    "ships": [
      { "type": "Battleship", "coords": [[3, 8], [4, 8], [4, 9], [5, 8]] },
      { "type": "Cruiser", "coords": [[6, 3], [6, 4], [7, 3]] },
      { "type": "Cruiser", "coords": [[3, 1], [3, 2], [4, 1]] },
      { "type": "Destroyer", "coords": [[3, 4], [3, 5]] },
      { "type": "Destroyer", "coords": [[9, 4], [9, 5]] },
      { "type": "Destroyer", "coords": [[0, 6], [0, 7]] },
      { "type": "Submarine", "coords": [[9, 0]] },
      { "type": "Submarine", "coords": [[0, 2]] },
      { "type": "Submarine", "coords": [[1, 0]] },
      { "type": "Submarine", "coords": [[8, 7]] }
    ]
  },
  {
    "name": "Lithuanian Layout 039",
    "ships": [
      { "type": "Battleship", "coords": [[0, 4], [1, 4], [2, 4], [2, 5]] },
      { "type": "Cruiser", "coords": [[4, 0], [4, 1], [5, 0]] },
      { "type": "Cruiser", "coords": [[5, 6], [5, 7], [5, 8]] },
      { "type": "Destroyer", "coords": [[0, 0], [1, 0]] },
      { "type": "Destroyer", "coords": [[7, 1], [8, 1]] },
      { "type": "Destroyer", "coords": [[2, 8], [2, 9]] },
      { "type": "Submarine", "coords": [[7, 5]] },
      { "type": "Submarine", "coords": [[7, 9]] },
      { "type": "Submarine", "coords": [[7, 3]] },
      { "type": "Submarine", "coords": [[1, 2]] }
    ]
  },
  {
    "name": "Lithuanian Layout 040",
    "ships": [
      { "type": "Battleship", "coords": [[6, 7], [6, 8], [7, 7], [7, 8]] },
      { "type": "Cruiser", "coords": [[1, 2], [2, 1], [2, 2]] },
      { "type": "Cruiser", "coords": [[6, 2], [7, 1], [7, 2]] },
      { "type": "Destroyer", "coords": [[9, 2], [9, 3]] },
      { "type": "Destroyer", "coords": [[1, 8], [2, 8]] },
      { "type": "Destroyer", "coords": [[3, 5], [4, 5]] },
      { "type": "Submarine", "coords": [[4, 8]] },
      { "type": "Submarine", "coords": [[1, 6]] },
      { "type": "Submarine", "coords": [[5, 0]] },
      { "type": "Submarine", "coords": [[9, 7]] }
    ]
  },
  {
    "name": "Lithuanian Layout 041",
    "ships": [
      { "type": "Battleship", "coords": [[0, 2], [1, 1], [1, 2], [1, 3]] },
      { "type": "Cruiser", "coords": [[4, 5], [4, 6], [5, 6]] },
      { "type": "Cruiser", "coords": [[1, 6], [2, 5], [2, 6]] },
      { "type": "Destroyer", "coords": [[9, 6], [9, 7]] },
      { "type": "Destroyer", "coords": [[7, 7], [7, 8]] },
      { "type": "Destroyer", "coords": [[7, 4], [8, 4]] },
      { "type": "Submarine", "coords": [[6, 2]] },
      { "type": "Submarine", "coords": [[4, 8]] },
      { "type": "Submarine", "coords": [[6, 0]] },
      { "type": "Submarine", "coords": [[2, 9]] }
    ]
  },
  {
    "name": "Lithuanian Layout 042",
    "ships": [
      { "type": "Battleship", "coords": [[8, 7], [8, 8], [9, 7], [9, 8]] },
      { "type": "Cruiser", "coords": [[2, 6], [3, 6], [4, 6]] },
      { "type": "Cruiser", "coords": [[0, 1], [1, 1], [1, 2]] },
      { "type": "Destroyer", "coords": [[8, 0], [9, 0]] },
      { "type": "Destroyer", "coords": [[7, 4], [8, 4]] },
      { "type": "Destroyer", "coords": [[5, 3], [5, 4]] },
      { "type": "Submarine", "coords": [[2, 9]] },
      { "type": "Submarine", "coords": [[6, 9]] },
      { "type": "Submarine", "coords": [[6, 0]] },
      { "type": "Submarine", "coords": [[2, 4]] }
    ]
  },
  {
    "name": "Lithuanian Layout 043",
    "ships": [
      { "type": "Battleship", "coords": [[8, 8], [8, 9], [9, 7], [9, 8]] },
      { "type": "Cruiser", "coords": [[4, 8], [5, 8], [5, 9]] },
      { "type": "Cruiser", "coords": [[1, 7], [1, 8], [2, 7]] },
      { "type": "Destroyer", "coords": [[1, 0], [1, 1]] },
      { "type": "Destroyer", "coords": [[9, 3], [9, 4]] },
      { "type": "Destroyer", "coords": [[5, 0], [5, 1]] },
      { "type": "Submarine", "coords": [[7, 4]] },
      { "type": "Submarine", "coords": [[3, 5]] },
      { "type": "Submarine", "coords": [[5, 3]] },
      { "type": "Submarine", "coords": [[9, 1]] }
    ]
  },
  {
    "name": "Lithuanian Layout 044",
    "ships": [
      { "type": "Battleship", "coords": [[8, 4], [8, 5], [8, 6], [9, 6]] },
      { "type": "Cruiser", "coords": [[5, 7], [6, 6], [6, 7]] },
      { "type": "Cruiser", "coords": [[2, 6], [2, 7], [3, 7]] },
      { "type": "Destroyer", "coords": [[3, 1], [3, 2]] },
      { "type": "Destroyer", "coords": [[8, 8], [9, 8]] },
      { "type": "Destroyer", "coords": [[0, 6], [0, 7]] },
      { "type": "Submarine", "coords": [[5, 9]] },
      { "type": "Submarine", "coords": [[8, 2]] },
      { "type": "Submarine", "coords": [[5, 3]] },
      { "type": "Submarine", "coords": [[1, 9]] }
    ]
  },
  {
    "name": "Lithuanian Layout 045",
    "ships": [
      { "type": "Battleship", "coords": [[3, 0], [3, 1], [3, 2], [4, 1]] },
      { "type": "Cruiser", "coords": [[7, 9], [8, 8], [8, 9]] },
      { "type": "Cruiser", "coords": [[5, 5], [5, 6], [6, 6]] },
      { "type": "Destroyer", "coords": [[1, 8], [2, 8]] },
      { "type": "Destroyer", "coords": [[0, 0], [1, 0]] },
      { "type": "Destroyer", "coords": [[8, 3], [9, 3]] },
      { "type": "Submarine", "coords": [[1, 3]] },
      { "type": "Submarine", "coords": [[6, 0]] },
      { "type": "Submarine", "coords": [[0, 6]] },
      { "type": "Submarine", "coords": [[5, 8]] }
    ]
  },
  {
    "name": "Lithuanian Layout 046",
    "ships": [
      { "type": "Battleship", "coords": [[6, 6], [7, 4], [7, 5], [7, 6]] },
      { "type": "Cruiser", "coords": [[7, 1], [8, 1], [8, 2]] },
      { "type": "Cruiser", "coords": [[2, 2], [2, 3], [3, 2]] },
      { "type": "Destroyer", "coords": [[0, 6], [0, 7]] },
      { "type": "Destroyer", "coords": [[6, 8], [7, 8]] },
      { "type": "Destroyer", "coords": [[2, 9], [3, 9]] },
      { "type": "Submarine", "coords": [[5, 0]] },
      { "type": "Submarine", "coords": [[2, 6]] },
      { "type": "Submarine", "coords": [[9, 6]] },
      { "type": "Submarine", "coords": [[0, 9]] }
    ]
  },
  {
    "name": "Lithuanian Layout 047",
    "ships": [
      { "type": "Battleship", "coords": [[0, 2], [1, 2], [2, 1], [2, 2]] },
      { "type": "Cruiser", "coords": [[4, 0], [4, 1], [5, 1]] },
      { "type": "Cruiser", "coords": [[4, 7], [5, 7], [5, 8]] },
      { "type": "Destroyer", "coords": [[7, 0], [8, 0]] },
      { "type": "Destroyer", "coords": [[3, 4], [4, 4]] },
      { "type": "Destroyer", "coords": [[8, 4], [8, 5]] },
      { "type": "Submarine", "coords": [[1, 6]] },
      { "type": "Submarine", "coords": [[0, 8]] },
      { "type": "Submarine", "coords": [[7, 8]] },
      { "type": "Submarine", "coords": [[6, 3]] }
    ]
  },
  {
    "name": "Lithuanian Layout 048",
    "ships": [
      { "type": "Battleship", "coords": [[3, 3], [4, 3], [5, 2], [5, 3]] },
      { "type": "Cruiser", "coords": [[0, 6], [0, 7], [0, 8]] },
      { "type": "Cruiser", "coords": [[1, 0], [1, 1], [1, 2]] },
      { "type": "Destroyer", "coords": [[7, 3], [8, 3]] },
      { "type": "Destroyer", "coords": [[5, 5], [6, 5]] },
      { "type": "Destroyer", "coords": [[5, 0], [6, 0]] },
      { "type": "Submarine", "coords": [[8, 5]] },
      { "type": "Submarine", "coords": [[5, 9]] },
      { "type": "Submarine", "coords": [[9, 7]] },
      { "type": "Submarine", "coords": [[0, 4]] }
    ]
  },
  {
    "name": "Lithuanian Layout 049",
    "ships": [
      { "type": "Battleship", "coords": [[1, 6], [2, 4], [2, 5], [2, 6]] },
      { "type": "Cruiser", "coords": [[0, 2], [1, 2], [2, 2]] },
      { "type": "Cruiser", "coords": [[7, 1], [8, 0], [8, 1]] },
      { "type": "Destroyer", "coords": [[9, 4], [9, 5]] },
      { "type": "Destroyer", "coords": [[5, 9], [6, 9]] },
      { "type": "Destroyer", "coords": [[6, 4], [7, 4]] },
      { "type": "Submarine", "coords": [[4, 0]] },
      { "type": "Submarine", "coords": [[1, 0]] },
      { "type": "Submarine", "coords": [[1, 8]] },
      { "type": "Submarine", "coords": [[5, 7]] }
    ]
  },
  {
    "name": "Lithuanian Layout 050",
    "ships": [
      { "type": "Battleship", "coords": [[3, 7], [3, 8], [4, 8], [5, 8]] },
      { "type": "Cruiser", "coords": [[5, 6], [6, 6], [7, 6]] },
      { "type": "Cruiser", "coords": [[2, 1], [2, 2], [2, 3]] },
      { "type": "Destroyer", "coords": [[7, 2], [8, 2]] },
      { "type": "Destroyer", "coords": [[0, 4], [0, 5]] },
      { "type": "Destroyer", "coords": [[2, 5], [3, 5]] },
      { "type": "Submarine", "coords": [[6, 0]] },
      { "type": "Submarine", "coords": [[5, 4]] },
      { "type": "Submarine", "coords": [[1, 9]] },
      { "type": "Submarine", "coords": [[0, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 051",
    "ships": [
      { "type": "Battleship", "coords": [[3, 1], [3, 2], [4, 1], [4, 2]] },
      { "type": "Cruiser", "coords": [[5, 5], [6, 5], [7, 5]] },
      { "type": "Cruiser", "coords": [[5, 8], [5, 9], [6, 9]] },
      { "type": "Destroyer", "coords": [[9, 2], [9, 3]] },
      { "type": "Destroyer", "coords": [[8, 8], [9, 8]] },
      { "type": "Destroyer", "coords": [[6, 0], [6, 1]] },
      { "type": "Submarine", "coords": [[7, 3]] },
      { "type": "Submarine", "coords": [[2, 6]] },
      { "type": "Submarine", "coords": [[8, 0]] },
      { "type": "Submarine", "coords": [[0, 2]] }
    ]
  },
  {
    "name": "Lithuanian Layout 052",
    "ships": [
      { "type": "Battleship", "coords": [[2, 5], [3, 5], [4, 5], [5, 5]] },
      { "type": "Cruiser", "coords": [[3, 0], [3, 1], [3, 2]] },
      { "type": "Cruiser", "coords": [[2, 7], [2, 8], [2, 9]] },
      { "type": "Destroyer", "coords": [[9, 7], [9, 8]] },
      { "type": "Destroyer", "coords": [[7, 3], [8, 3]] },
      { "type": "Destroyer", "coords": [[4, 7], [5, 7]] },
      { "type": "Submarine", "coords": [[0, 8]] },
      { "type": "Submarine", "coords": [[7, 9]] },
      { "type": "Submarine", "coords": [[7, 6]] },
      { "type": "Submarine", "coords": [[0, 4]] }
    ]
  },
  {
    "name": "Lithuanian Layout 053",
    "ships": [
      { "type": "Battleship", "coords": [[0, 4], [0, 5], [1, 4], [1, 5]] },
      { "type": "Cruiser", "coords": [[0, 8], [0, 9], [1, 8]] },
      { "type": "Cruiser", "coords": [[8, 6], [8, 7], [9, 7]] },
      { "type": "Destroyer", "coords": [[4, 9], [5, 9]] },
      { "type": "Destroyer", "coords": [[8, 2], [9, 2]] },
      { "type": "Destroyer", "coords": [[7, 4], [8, 4]] },
      { "type": "Submarine", "coords": [[6, 1]] },
      { "type": "Submarine", "coords": [[3, 3]] },
      { "type": "Submarine", "coords": [[3, 5]] },
      { "type": "Submarine", "coords": [[6, 6]] }
    ]
  },
  {
    "name": "Lithuanian Layout 054",
    "ships": [
      { "type": "Battleship", "coords": [[0, 7], [1, 6], [1, 7], [2, 7]] },
      { "type": "Cruiser", "coords": [[6, 5], [6, 6], [7, 6]] },
      { "type": "Cruiser", "coords": [[2, 0], [2, 1], [2, 2]] },
      { "type": "Destroyer", "coords": [[7, 8], [8, 8]] },
      { "type": "Destroyer", "coords": [[7, 1], [7, 2]] },
      { "type": "Destroyer", "coords": [[9, 2], [9, 3]] },
      { "type": "Submarine", "coords": [[2, 4]] },
      { "type": "Submarine", "coords": [[1, 9]] },
      { "type": "Submarine", "coords": [[4, 8]] },
      { "type": "Submarine", "coords": [[5, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 055",
    "ships": [
      { "type": "Battleship", "coords": [[6, 5], [6, 6], [7, 5], [7, 6]] },
      { "type": "Cruiser", "coords": [[2, 5], [2, 6], [3, 5]] },
      { "type": "Cruiser", "coords": [[5, 2], [5, 3], [6, 3]] },
      { "type": "Destroyer", "coords": [[1, 8], [1, 9]] },
      { "type": "Destroyer", "coords": [[8, 0], [8, 1]] },
      { "type": "Destroyer", "coords": [[7, 9], [8, 9]] },
      { "type": "Submarine", "coords": [[0, 3]] },
      { "type": "Submarine", "coords": [[1, 1]] },
      { "type": "Submarine", "coords": [[9, 3]] },
      { "type": "Submarine", "coords": [[9, 7]] }
    ]
  },
  {
    "name": "Lithuanian Layout 056",
    "ships": [
      { "type": "Battleship", "coords": [[6, 7], [6, 8], [7, 7], [7, 8]] },
      { "type": "Cruiser", "coords": [[5, 5], [6, 4], [6, 5]] },
      { "type": "Cruiser", "coords": [[5, 0], [6, 0], [7, 0]] },
      { "type": "Destroyer", "coords": [[0, 4], [1, 4]] },
      { "type": "Destroyer", "coords": [[2, 8], [3, 8]] },
      { "type": "Destroyer", "coords": [[3, 1], [3, 2]] },
      { "type": "Submarine", "coords": [[1, 1]] },
      { "type": "Submarine", "coords": [[9, 3]] },
      { "type": "Submarine", "coords": [[0, 8]] },
      { "type": "Submarine", "coords": [[9, 8]] }
    ]
  },
  {
    "name": "Lithuanian Layout 057",
    "ships": [
      { "type": "Battleship", "coords": [[3, 4], [3, 5], [4, 5], [5, 5]] },
      { "type": "Cruiser", "coords": [[4, 9], [5, 9], [6, 9]] },
      { "type": "Cruiser", "coords": [[4, 2], [5, 2], [5, 3]] },
      { "type": "Destroyer", "coords": [[7, 4], [7, 5]] },
      { "type": "Destroyer", "coords": [[8, 7], [9, 7]] },
      { "type": "Destroyer", "coords": [[1, 7], [2, 7]] },
      { "type": "Submarine", "coords": [[5, 0]] },
      { "type": "Submarine", "coords": [[1, 5]] },
      { "type": "Submarine", "coords": [[7, 1]] },
      { "type": "Submarine", "coords": [[1, 1]] }
    ]
  },
  {
    "name": "Lithuanian Layout 058",
    "ships": [
      { "type": "Battleship", "coords": [[7, 3], [7, 4], [7, 5], [7, 6]] },
      { "type": "Cruiser", "coords": [[5, 0], [6, 0], [7, 0]] },
      { "type": "Cruiser", "coords": [[0, 6], [0, 7], [0, 8]] },
      { "type": "Destroyer", "coords": [[5, 7], [5, 8]] },
      { "type": "Destroyer", "coords": [[3, 3], [4, 3]] },
      { "type": "Destroyer", "coords": [[2, 9], [3, 9]] },
      { "type": "Submarine", "coords": [[1, 1]] },
      { "type": "Submarine", "coords": [[4, 5]] },
      { "type": "Submarine", "coords": [[9, 5]] },
      { "type": "Submarine", "coords": [[2, 6]] }
    ]
  },
  {
    "name": "Lithuanian Layout 059",
    "ships": [
      { "type": "Battleship", "coords": [[2, 2], [3, 0], [3, 1], [3, 2]] },
      { "type": "Cruiser", "coords": [[8, 4], [9, 4], [9, 5]] },
      { "type": "Cruiser", "coords": [[0, 9], [1, 9], [2, 9]] },
      { "type": "Destroyer", "coords": [[2, 4], [2, 5]] },
      { "type": "Destroyer", "coords": [[5, 9], [6, 9]] },
      { "type": "Destroyer", "coords": [[1, 7], [2, 7]] },
      { "type": "Submarine", "coords": [[7, 1]] },
      { "type": "Submarine", "coords": [[8, 7]] },
      { "type": "Submarine", "coords": [[0, 4]] },
      { "type": "Submarine", "coords": [[6, 5]] }
    ]
  },
  {
    "name": "Lithuanian Layout 060",
    "ships": [
      { "type": "Battleship", "coords": [[6, 3], [6, 4], [6, 5], [6, 6]] },
      { "type": "Cruiser", "coords": [[2, 1], [3, 1], [3, 2]] },
      { "type": "Cruiser", "coords": [[2, 5], [3, 5], [3, 6]] },
      { "type": "Destroyer", "coords": [[6, 8], [7, 8]] },
      { "type": "Destroyer", "coords": [[9, 6], [9, 7]] },
      { "type": "Destroyer", "coords": [[9, 0], [9, 1]] },
      { "type": "Submarine", "coords": [[1, 8]] },
      { "type": "Submarine", "coords": [[9, 9]] },
      { "type": "Submarine", "coords": [[0, 4]] },
      { "type": "Submarine", "coords": [[5, 1]] }
    ]
  },
  {
    "name": "Lithuanian Layout 061",
    "ships": [
      { "type": "Battleship", "coords": [[7, 3], [7, 4], [8, 3], [8, 4]] },
      { "type": "Cruiser", "coords": [[1, 5], [1, 6], [2, 6]] },
      { "type": "Cruiser", "coords": [[1, 2], [2, 1], [2, 2]] },
      { "type": "Destroyer", "coords": [[6, 0], [7, 0]] },
      { "type": "Destroyer", "coords": [[4, 7], [5, 7]] },
      { "type": "Destroyer", "coords": [[9, 6], [9, 7]] },
      { "type": "Submarine", "coords": [[7, 9]] },
      { "type": "Submarine", "coords": [[9, 0]] },
      { "type": "Submarine", "coords": [[5, 3]] },
      { "type": "Submarine", "coords": [[3, 9]] }
    ]
  },
  {
    "name": "Lithuanian Layout 062",
    "ships": [
      { "type": "Battleship", "coords": [[8, 2], [8, 3], [8, 4], [9, 3]] },
      { "type": "Cruiser", "coords": [[0, 8], [1, 8], [2, 8]] },
      { "type": "Cruiser", "coords": [[4, 2], [5, 2], [6, 2]] },
      { "type": "Destroyer", "coords": [[5, 6], [5, 7]] },
      { "type": "Destroyer", "coords": [[3, 4], [4, 4]] },
      { "type": "Destroyer", "coords": [[0, 5], [0, 6]] },
      { "type": "Submarine", "coords": [[1, 0]] },
      { "type": "Submarine", "coords": [[8, 6]] },
      { "type": "Submarine", "coords": [[1, 2]] },
      { "type": "Submarine", "coords": [[8, 8]] }
    ]
  },
  {
    "name": "Lithuanian Layout 063",
    "ships": [
      { "type": "Battleship", "coords": [[4, 5], [5, 5], [6, 5], [6, 6]] },
      { "type": "Cruiser", "coords": [[4, 0], [5, 0], [6, 0]] },
      { "type": "Cruiser", "coords": [[7, 8], [7, 9], [8, 9]] },
      { "type": "Destroyer", "coords": [[5, 2], [6, 2]] },
      { "type": "Destroyer", "coords": [[3, 9], [4, 9]] },
      { "type": "Destroyer", "coords": [[0, 5], [1, 5]] },
      { "type": "Submarine", "coords": [[0, 7]] },
      { "type": "Submarine", "coords": [[0, 0]] },
      { "type": "Submarine", "coords": [[2, 7]] },
      { "type": "Submarine", "coords": [[9, 3]] }
    ]
  },
  {
    "name": "Lithuanian Layout 064",
    "ships": [
      { "type": "Battleship", "coords": [[1, 1], [1, 2], [1, 3], [2, 1]] },
      { "type": "Cruiser", "coords": [[4, 4], [4, 5], [5, 4]] },
      { "type": "Cruiser", "coords": [[7, 6], [8, 5], [8, 6]] },
      { "type": "Destroyer", "coords": [[6, 9], [7, 9]] },
      { "type": "Destroyer", "coords": [[7, 2], [7, 3]] },
      { "type": "Destroyer", "coords": [[0, 8], [0, 9]] },
      { "type": "Submarine", "coords": [[2, 9]] },
      { "type": "Submarine", "coords": [[4, 0]] },
      { "type": "Submarine", "coords": [[9, 9]] },
      { "type": "Submarine", "coords": [[2, 7]] }
    ]
  },
  {
    "name": "Lithuanian Layout 065",
    "ships": [
      { "type": "Battleship", "coords": [[7, 3], [8, 3], [8, 4], [8, 5]] },
      { "type": "Cruiser", "coords": [[1, 2], [1, 3], [2, 2]] },
      { "type": "Cruiser", "coords": [[0, 8], [0, 9], [1, 8]] },
      { "type": "Destroyer", "coords": [[0, 5], [1, 5]] },
      { "type": "Destroyer", "coords": [[5, 1], [5, 2]] },
      { "type": "Destroyer", "coords": [[5, 4], [5, 5]] },
      { "type": "Submarine", "coords": [[1, 0]] },
      { "type": "Submarine", "coords": [[6, 7]] },
      { "type": "Submarine", "coords": [[4, 7]] },
      { "type": "Submarine", "coords": [[9, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 066",
    "ships": [
      { "type": "Battleship", "coords": [[1, 7], [1, 8], [2, 7], [2, 8]] },
      { "type": "Cruiser", "coords": [[6, 7], [7, 6], [7, 7]] },
      { "type": "Cruiser", "coords": [[3, 1], [3, 2], [3, 3]] },
      { "type": "Destroyer", "coords": [[2, 5], [3, 5]] },
      { "type": "Destroyer", "coords": [[6, 0], [6, 1]] },
      { "type": "Destroyer", "coords": [[8, 1], [8, 2]] },
      { "type": "Submarine", "coords": [[1, 2]] },
      { "type": "Submarine", "coords": [[5, 3]] },
      { "type": "Submarine", "coords": [[9, 7]] },
      { "type": "Submarine", "coords": [[1, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 067",
    "ships": [
      { "type": "Battleship", "coords": [[1, 5], [2, 4], [2, 5], [2, 6]] },
      { "type": "Cruiser", "coords": [[6, 7], [6, 8], [6, 9]] },
      { "type": "Cruiser", "coords": [[7, 1], [8, 0], [8, 1]] },
      { "type": "Destroyer", "coords": [[2, 1], [3, 1]] },
      { "type": "Destroyer", "coords": [[5, 5], [6, 5]] },
      { "type": "Destroyer", "coords": [[4, 7], [4, 8]] },
      { "type": "Submarine", "coords": [[9, 7]] },
      { "type": "Submarine", "coords": [[9, 3]] },
      { "type": "Submarine", "coords": [[7, 3]] },
      { "type": "Submarine", "coords": [[5, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 068",
    "ships": [
      { "type": "Battleship", "coords": [[7, 7], [8, 6], [8, 7], [9, 6]] },
      { "type": "Cruiser", "coords": [[4, 6], [5, 5], [5, 6]] },
      { "type": "Cruiser", "coords": [[3, 2], [4, 1], [4, 2]] },
      { "type": "Destroyer", "coords": [[0, 2], [0, 3]] },
      { "type": "Destroyer", "coords": [[1, 5], [1, 6]] },
      { "type": "Destroyer", "coords": [[4, 8], [5, 8]] },
      { "type": "Submarine", "coords": [[8, 2]] },
      { "type": "Submarine", "coords": [[6, 2]] },
      { "type": "Submarine", "coords": [[1, 9]] },
      { "type": "Submarine", "coords": [[1, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 069",
    "ships": [
      { "type": "Battleship", "coords": [[7, 2], [7, 3], [8, 2], [8, 3]] },
      { "type": "Cruiser", "coords": [[4, 1], [5, 0], [5, 1]] },
      { "type": "Cruiser", "coords": [[2, 1], [2, 2], [2, 3]] },
      { "type": "Destroyer", "coords": [[4, 8], [5, 8]] },
      { "type": "Destroyer", "coords": [[4, 5], [4, 6]] },
      { "type": "Destroyer", "coords": [[7, 7], [8, 7]] },
      { "type": "Submarine", "coords": [[0, 1]] },
      { "type": "Submarine", "coords": [[0, 7]] },
      { "type": "Submarine", "coords": [[9, 5]] },
      { "type": "Submarine", "coords": [[2, 6]] }
    ]
  },
  {
    "name": "Lithuanian Layout 070",
    "ships": [
      { "type": "Battleship", "coords": [[4, 0], [5, 0], [6, 0], [6, 1]] },
      { "type": "Cruiser", "coords": [[5, 6], [5, 7], [6, 7]] },
      { "type": "Cruiser", "coords": [[8, 1], [9, 0], [9, 1]] },
      { "type": "Destroyer", "coords": [[0, 9], [1, 9]] },
      { "type": "Destroyer", "coords": [[4, 9], [5, 9]] },
      { "type": "Destroyer", "coords": [[0, 3], [0, 4]] },
      { "type": "Submarine", "coords": [[9, 7]] },
      { "type": "Submarine", "coords": [[8, 4]] },
      { "type": "Submarine", "coords": [[5, 4]] },
      { "type": "Submarine", "coords": [[2, 2]] }
    ]
  },
  {
    "name": "Lithuanian Layout 071",
    "ships": [
      { "type": "Battleship", "coords": [[3, 7], [4, 7], [4, 8], [4, 9]] },
      { "type": "Cruiser", "coords": [[9, 1], [9, 2], [9, 3]] },
      { "type": "Cruiser", "coords": [[7, 4], [7, 5], [7, 6]] },
      { "type": "Destroyer", "coords": [[3, 2], [4, 2]] },
      { "type": "Destroyer", "coords": [[7, 0], [7, 1]] },
      { "type": "Destroyer", "coords": [[0, 7], [0, 8]] },
      { "type": "Submarine", "coords": [[0, 0]] },
      { "type": "Submarine", "coords": [[8, 9]] },
      { "type": "Submarine", "coords": [[6, 8]] },
      { "type": "Submarine", "coords": [[1, 5]] }
    ]
  },
  {
    "name": "Lithuanian Layout 072",
    "ships": [
      { "type": "Battleship", "coords": [[0, 7], [0, 8], [0, 9], [1, 8]] },
      { "type": "Cruiser", "coords": [[4, 9], [5, 9], [6, 9]] },
      { "type": "Cruiser", "coords": [[4, 6], [4, 7], [5, 7]] },
      { "type": "Destroyer", "coords": [[6, 0], [7, 0]] },
      { "type": "Destroyer", "coords": [[4, 3], [5, 3]] },
      { "type": "Destroyer", "coords": [[1, 0], [2, 0]] },
      { "type": "Submarine", "coords": [[9, 5]] },
      { "type": "Submarine", "coords": [[1, 4]] },
      { "type": "Submarine", "coords": [[7, 5]] },
      { "type": "Submarine", "coords": [[2, 2]] }
    ]
  },
  {
    "name": "Lithuanian Layout 073",
    "ships": [
      { "type": "Battleship", "coords": [[2, 3], [3, 1], [3, 2], [3, 3]] },
      { "type": "Cruiser", "coords": [[3, 5], [3, 6], [3, 7]] },
      { "type": "Cruiser", "coords": [[1, 9], [2, 9], [3, 9]] },
      { "type": "Destroyer", "coords": [[6, 6], [7, 6]] },
      { "type": "Destroyer", "coords": [[5, 8], [6, 8]] },
      { "type": "Destroyer", "coords": [[9, 6], [9, 7]] },
      { "type": "Submarine", "coords": [[8, 1]] },
      { "type": "Submarine", "coords": [[0, 3]] },
      { "type": "Submarine", "coords": [[0, 0]] },
      { "type": "Submarine", "coords": [[8, 9]] }
    ]
  },
  {
    "name": "Lithuanian Layout 074",
    "ships": [
      { "type": "Battleship", "coords": [[8, 5], [8, 6], [9, 6], [9, 7]] },
      { "type": "Cruiser", "coords": [[1, 3], [2, 3], [2, 4]] },
      { "type": "Cruiser", "coords": [[0, 9], [1, 8], [1, 9]] },
      { "type": "Destroyer", "coords": [[6, 9], [7, 9]] },
      { "type": "Destroyer", "coords": [[4, 3], [4, 4]] },
      { "type": "Destroyer", "coords": [[5, 0], [5, 1]] },
      { "type": "Submarine", "coords": [[9, 3]] },
      { "type": "Submarine", "coords": [[3, 7]] },
      { "type": "Submarine", "coords": [[3, 1]] },
      { "type": "Submarine", "coords": [[9, 9]] }
    ]
  },
  {
    "name": "Lithuanian Layout 075",
    "ships": [
      { "type": "Battleship", "coords": [[8, 7], [9, 6], [9, 7], [9, 8]] },
      { "type": "Cruiser", "coords": [[0, 0], [0, 1], [0, 2]] },
      { "type": "Cruiser", "coords": [[2, 2], [3, 2], [4, 2]] },
      { "type": "Destroyer", "coords": [[1, 7], [2, 7]] },
      { "type": "Destroyer", "coords": [[4, 4], [5, 4]] },
      { "type": "Destroyer", "coords": [[8, 3], [8, 4]] },
      { "type": "Submarine", "coords": [[6, 1]] },
      { "type": "Submarine", "coords": [[3, 0]] },
      { "type": "Submarine", "coords": [[2, 9]] },
      { "type": "Submarine", "coords": [[4, 8]] }
    ]
  },
  {
    "name": "Lithuanian Layout 076",
    "ships": [
      { "type": "Battleship", "coords": [[0, 4], [0, 5], [1, 4], [1, 5]] },
      { "type": "Cruiser", "coords": [[4, 5], [5, 5], [6, 5]] },
      { "type": "Cruiser", "coords": [[3, 0], [3, 1], [4, 0]] },
      { "type": "Destroyer", "coords": [[7, 8], [8, 8]] },
      { "type": "Destroyer", "coords": [[3, 8], [3, 9]] },
      { "type": "Destroyer", "coords": [[6, 0], [7, 0]] },
      { "type": "Submarine", "coords": [[9, 5]] },
      { "type": "Submarine", "coords": [[1, 9]] },
      { "type": "Submarine", "coords": [[5, 7]] },
      { "type": "Submarine", "coords": [[0, 7]] }
    ]
  },
  {
    "name": "Lithuanian Layout 077",
    "ships": [
      { "type": "Battleship", "coords": [[7, 2], [8, 0], [8, 1], [8, 2]] },
      { "type": "Cruiser", "coords": [[0, 1], [1, 1], [1, 2]] },
      { "type": "Cruiser", "coords": [[8, 8], [9, 8], [9, 9]] },
      { "type": "Destroyer", "coords": [[2, 8], [2, 9]] },
      { "type": "Destroyer", "coords": [[4, 5], [4, 6]] },
      { "type": "Destroyer", "coords": [[6, 6], [6, 7]] },
      { "type": "Submarine", "coords": [[2, 4]] },
      { "type": "Submarine", "coords": [[5, 0]] },
      { "type": "Submarine", "coords": [[3, 0]] },
      { "type": "Submarine", "coords": [[4, 3]] }
    ]
  },
  {
    "name": "Lithuanian Layout 078",
    "ships": [
      { "type": "Battleship", "coords": [[4, 9], [5, 9], [6, 8], [6, 9]] },
      { "type": "Cruiser", "coords": [[7, 1], [8, 1], [8, 2]] },
      { "type": "Cruiser", "coords": [[9, 5], [9, 6], [9, 7]] },
      { "type": "Destroyer", "coords": [[8, 9], [9, 9]] },
      { "type": "Destroyer", "coords": [[0, 0], [0, 1]] },
      { "type": "Destroyer", "coords": [[3, 5], [3, 6]] },
      { "type": "Submarine", "coords": [[1, 7]] },
      { "type": "Submarine", "coords": [[5, 2]] },
      { "type": "Submarine", "coords": [[0, 3]] },
      { "type": "Submarine", "coords": [[1, 9]] }
    ]
  },
  {
    "name": "Lithuanian Layout 079",
    "ships": [
      { "type": "Battleship", "coords": [[5, 5], [6, 4], [6, 5], [7, 5]] },
      { "type": "Cruiser", "coords": [[6, 8], [6, 9], [7, 9]] },
      { "type": "Cruiser", "coords": [[0, 1], [1, 0], [1, 1]] },
      { "type": "Destroyer", "coords": [[5, 2], [6, 2]] },
      { "type": "Destroyer", "coords": [[9, 5], [9, 6]] },
      { "type": "Destroyer", "coords": [[8, 2], [8, 3]] },
      { "type": "Submarine", "coords": [[2, 9]] },
      { "type": "Submarine", "coords": [[3, 5]] },
      { "type": "Submarine", "coords": [[7, 0]] },
      { "type": "Submarine", "coords": [[4, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 080",
    "ships": [
      { "type": "Battleship", "coords": [[0, 0], [0, 1], [0, 2], [1, 0]] },
      { "type": "Cruiser", "coords": [[2, 4], [3, 4], [4, 4]] },
      { "type": "Cruiser", "coords": [[6, 5], [7, 5], [7, 6]] },
      { "type": "Destroyer", "coords": [[4, 0], [4, 1]] },
      { "type": "Destroyer", "coords": [[5, 9], [6, 9]] },
      { "type": "Destroyer", "coords": [[8, 0], [9, 0]] },
      { "type": "Submarine", "coords": [[8, 8]] },
      { "type": "Submarine", "coords": [[9, 6]] },
      { "type": "Submarine", "coords": [[0, 6]] },
      { "type": "Submarine", "coords": [[4, 7]] }
    ]
  },
  {
    "name": "Lithuanian Layout 081",
    "ships": [
      { "type": "Battleship", "coords": [[1, 7], [2, 5], [2, 6], [2, 7]] },
      { "type": "Cruiser", "coords": [[1, 1], [2, 1], [2, 2]] },
      { "type": "Cruiser", "coords": [[7, 5], [8, 4], [8, 5]] },
      { "type": "Destroyer", "coords": [[8, 0], [8, 1]] },
      { "type": "Destroyer", "coords": [[4, 7], [4, 8]] },
      { "type": "Destroyer", "coords": [[0, 3], [0, 4]] },
      { "type": "Submarine", "coords": [[2, 9]] },
      { "type": "Submarine", "coords": [[5, 0]] },
      { "type": "Submarine", "coords": [[9, 9]] },
      { "type": "Submarine", "coords": [[4, 4]] }
    ]
  },
  {
    "name": "Lithuanian Layout 082",
    "ships": [
      { "type": "Battleship", "coords": [[7, 1], [8, 1], [8, 2], [8, 3]] },
      { "type": "Cruiser", "coords": [[4, 5], [4, 6], [5, 5]] },
      { "type": "Cruiser", "coords": [[4, 1], [4, 2], [4, 3]] },
      { "type": "Destroyer", "coords": [[0, 2], [1, 2]] },
      { "type": "Destroyer", "coords": [[0, 6], [1, 6]] },
      { "type": "Destroyer", "coords": [[6, 8], [7, 8]] },
      { "type": "Submarine", "coords": [[1, 4]] },
      { "type": "Submarine", "coords": [[0, 0]] },
      { "type": "Submarine", "coords": [[7, 5]] },
      { "type": "Submarine", "coords": [[4, 9]] }
    ]
  },
  {
    "name": "Lithuanian Layout 083",
    "ships": [
      { "type": "Battleship", "coords": [[3, 7], [3, 8], [4, 7], [4, 8]] },
      { "type": "Cruiser", "coords": [[2, 4], [3, 3], [3, 4]] },
      { "type": "Cruiser", "coords": [[6, 9], [7, 9], [8, 9]] },
      { "type": "Destroyer", "coords": [[6, 0], [6, 1]] },
      { "type": "Destroyer", "coords": [[6, 6], [7, 6]] },
      { "type": "Destroyer", "coords": [[7, 4], [8, 4]] },
      { "type": "Submarine", "coords": [[8, 1]] },
      { "type": "Submarine", "coords": [[3, 1]] },
      { "type": "Submarine", "coords": [[9, 7]] },
      { "type": "Submarine", "coords": [[0, 7]] }
    ]
  },
  {
    "name": "Lithuanian Layout 084",
    "ships": [
      { "type": "Battleship", "coords": [[2, 1], [2, 2], [3, 1], [3, 2]] },
      { "type": "Cruiser", "coords": [[7, 4], [8, 4], [9, 4]] },
      { "type": "Cruiser", "coords": [[8, 7], [8, 8], [8, 9]] },
      { "type": "Destroyer", "coords": [[4, 4], [5, 4]] },
      { "type": "Destroyer", "coords": [[0, 7], [1, 7]] },
      { "type": "Destroyer", "coords": [[4, 7], [5, 7]] },
      { "type": "Submarine", "coords": [[5, 9]] },
      { "type": "Submarine", "coords": [[0, 3]] },
      { "type": "Submarine", "coords": [[2, 9]] },
      { "type": "Submarine", "coords": [[8, 2]] }
    ]
  },
  {
    "name": "Lithuanian Layout 085",
    "ships": [
      { "type": "Battleship", "coords": [[4, 4], [5, 4], [5, 5], [6, 4]] },
      { "type": "Cruiser", "coords": [[1, 3], [2, 3], [2, 4]] },
      { "type": "Cruiser", "coords": [[6, 0], [6, 1], [7, 0]] },
      { "type": "Destroyer", "coords": [[8, 3], [8, 4]] },
      { "type": "Destroyer", "coords": [[2, 8], [3, 8]] },
      { "type": "Destroyer", "coords": [[1, 1], [2, 1]] },
      { "type": "Submarine", "coords": [[5, 9]] },
      { "type": "Submarine", "coords": [[8, 6]] },
      { "type": "Submarine", "coords": [[0, 8]] },
      { "type": "Submarine", "coords": [[9, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 086",
    "ships": [
      { "type": "Battleship", "coords": [[2, 2], [2, 3], [3, 3], [3, 4]] },
      { "type": "Cruiser", "coords": [[7, 6], [8, 5], [8, 6]] },
      { "type": "Cruiser", "coords": [[0, 4], [0, 5], [1, 5]] },
      { "type": "Destroyer", "coords": [[8, 8], [8, 9]] },
      { "type": "Destroyer", "coords": [[5, 4], [5, 5]] },
      { "type": "Destroyer", "coords": [[1, 7], [2, 7]] },
      { "type": "Submarine", "coords": [[8, 1]] },
      { "type": "Submarine", "coords": [[0, 1]] },
      { "type": "Submarine", "coords": [[5, 7]] },
      { "type": "Submarine", "coords": [[1, 9]] }
    ]
  },
  {
    "name": "Lithuanian Layout 087",
    "ships": [
      { "type": "Battleship", "coords": [[0, 1], [0, 2], [1, 1], [1, 2]] },
      { "type": "Cruiser", "coords": [[4, 0], [4, 1], [5, 1]] },
      { "type": "Cruiser", "coords": [[1, 4], [2, 4], [3, 4]] },
      { "type": "Destroyer", "coords": [[5, 5], [6, 5]] },
      { "type": "Destroyer", "coords": [[5, 3], [6, 3]] },
      { "type": "Destroyer", "coords": [[9, 0], [9, 1]] },
      { "type": "Submarine", "coords": [[2, 6]] },
      { "type": "Submarine", "coords": [[1, 9]] },
      { "type": "Submarine", "coords": [[6, 7]] },
      { "type": "Submarine", "coords": [[8, 7]] }
    ]
  },
  {
    "name": "Lithuanian Layout 088",
    "ships": [
      { "type": "Battleship", "coords": [[0, 5], [0, 6], [1, 4], [1, 5]] },
      { "type": "Cruiser", "coords": [[2, 0], [2, 1], [2, 2]] },
      { "type": "Cruiser", "coords": [[8, 4], [9, 3], [9, 4]] },
      { "type": "Destroyer", "coords": [[9, 7], [9, 8]] },
      { "type": "Destroyer", "coords": [[5, 8], [6, 8]] },
      { "type": "Destroyer", "coords": [[1, 8], [2, 8]] },
      { "type": "Submarine", "coords": [[7, 0]] },
      { "type": "Submarine", "coords": [[4, 0]] },
      { "type": "Submarine", "coords": [[6, 4]] },
      { "type": "Submarine", "coords": [[0, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 089",
    "ships": [
      { "type": "Battleship", "coords": [[2, 0], [2, 1], [2, 2], [3, 1]] },
      { "type": "Cruiser", "coords": [[6, 3], [6, 4], [6, 5]] },
      { "type": "Cruiser", "coords": [[2, 7], [3, 7], [3, 8]] },
      { "type": "Destroyer", "coords": [[8, 7], [9, 7]] },
      { "type": "Destroyer", "coords": [[5, 8], [5, 9]] },
      { "type": "Destroyer", "coords": [[0, 2], [0, 3]] },
      { "type": "Submarine", "coords": [[8, 3]] },
      { "type": "Submarine", "coords": [[3, 4]] },
      { "type": "Submarine", "coords": [[8, 9]] },
      { "type": "Submarine", "coords": [[7, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 090",
    "ships": [
      { "type": "Battleship", "coords": [[1, 5], [2, 5], [3, 5], [4, 5]] },
      { "type": "Cruiser", "coords": [[8, 0], [8, 1], [9, 1]] },
      { "type": "Cruiser", "coords": [[6, 4], [6, 5], [7, 4]] },
      { "type": "Destroyer", "coords": [[1, 8], [1, 9]] },
      { "type": "Destroyer", "coords": [[5, 7], [5, 8]] },
      { "type": "Destroyer", "coords": [[9, 5], [9, 6]] },
      { "type": "Submarine", "coords": [[2, 2]] },
      { "type": "Submarine", "coords": [[4, 1]] },
      { "type": "Submarine", "coords": [[8, 8]] },
      { "type": "Submarine", "coords": [[0, 1]] }
    ]
  },
  {
    "name": "Lithuanian Layout 091",
    "ships": [
      { "type": "Battleship", "coords": [[5, 2], [6, 2], [7, 2], [7, 3]] },
      { "type": "Cruiser", "coords": [[3, 7], [4, 6], [4, 7]] },
      { "type": "Cruiser", "coords": [[1, 4], [1, 5], [1, 6]] },
      { "type": "Destroyer", "coords": [[4, 4], [5, 4]] },
      { "type": "Destroyer", "coords": [[1, 0], [1, 1]] },
      { "type": "Destroyer", "coords": [[9, 5], [9, 6]] },
      { "type": "Submarine", "coords": [[7, 7]] },
      { "type": "Submarine", "coords": [[7, 5]] },
      { "type": "Submarine", "coords": [[4, 0]] },
      { "type": "Submarine", "coords": [[8, 9]] }
    ]
  },
  {
    "name": "Lithuanian Layout 092",
    "ships": [
      { "type": "Battleship", "coords": [[5, 0], [6, 0], [7, 0], [8, 0]] },
      { "type": "Cruiser", "coords": [[6, 3], [7, 3], [8, 3]] },
      { "type": "Cruiser", "coords": [[0, 8], [1, 8], [2, 8]] },
      { "type": "Destroyer", "coords": [[7, 7], [8, 7]] },
      { "type": "Destroyer", "coords": [[1, 0], [2, 0]] },
      { "type": "Destroyer", "coords": [[0, 5], [0, 6]] },
      { "type": "Submarine", "coords": [[5, 5]] },
      { "type": "Submarine", "coords": [[1, 3]] },
      { "type": "Submarine", "coords": [[7, 9]] },
      { "type": "Submarine", "coords": [[3, 6]] }
    ]
  },
  {
    "name": "Lithuanian Layout 093",
    "ships": [
      { "type": "Battleship", "coords": [[4, 0], [5, 0], [5, 1], [5, 2]] },
      { "type": "Cruiser", "coords": [[7, 6], [8, 5], [8, 6]] },
      { "type": "Cruiser", "coords": [[1, 6], [1, 7], [1, 8]] },
      { "type": "Destroyer", "coords": [[6, 9], [7, 9]] },
      { "type": "Destroyer", "coords": [[8, 2], [9, 2]] },
      { "type": "Destroyer", "coords": [[1, 1], [1, 2]] },
      { "type": "Submarine", "coords": [[4, 9]] },
      { "type": "Submarine", "coords": [[3, 5]] },
      { "type": "Submarine", "coords": [[5, 6]] },
      { "type": "Submarine", "coords": [[1, 4]] }
    ]
  },
  {
    "name": "Lithuanian Layout 094",
    "ships": [
      { "type": "Battleship", "coords": [[1, 4], [2, 3], [2, 4], [3, 4]] },
      { "type": "Cruiser", "coords": [[4, 2], [5, 2], [6, 2]] },
      { "type": "Cruiser", "coords": [[9, 0], [9, 1], [9, 2]] },
      { "type": "Destroyer", "coords": [[1, 7], [2, 7]] },
      { "type": "Destroyer", "coords": [[1, 0], [1, 1]] },
      { "type": "Destroyer", "coords": [[6, 8], [7, 8]] },
      { "type": "Submarine", "coords": [[9, 4]] },
      { "type": "Submarine", "coords": [[6, 5]] },
      { "type": "Submarine", "coords": [[4, 8]] },
      { "type": "Submarine", "coords": [[1, 9]] }
    ]
  },
  {
    "name": "Lithuanian Layout 095",
    "ships": [
      { "type": "Battleship", "coords": [[2, 7], [2, 8], [2, 9], [3, 7]] },
      { "type": "Cruiser", "coords": [[5, 6], [5, 7], [6, 7]] },
      { "type": "Cruiser", "coords": [[7, 2], [8, 2], [8, 3]] },
      { "type": "Destroyer", "coords": [[0, 5], [0, 6]] },
      { "type": "Destroyer", "coords": [[0, 2], [1, 2]] },
      { "type": "Destroyer", "coords": [[3, 0], [3, 1]] },
      { "type": "Submarine", "coords": [[7, 9]] },
      { "type": "Submarine", "coords": [[8, 5]] },
      { "type": "Submarine", "coords": [[5, 1]] },
      { "type": "Submarine", "coords": [[5, 9]] }
    ]
  },
  {
    "name": "Lithuanian Layout 096",
    "ships": [
      { "type": "Battleship", "coords": [[1, 2], [1, 3], [1, 4], [2, 2]] },
      { "type": "Cruiser", "coords": [[4, 1], [4, 2], [4, 3]] },
      { "type": "Cruiser", "coords": [[2, 7], [2, 8], [2, 9]] },
      { "type": "Destroyer", "coords": [[7, 0], [8, 0]] },
      { "type": "Destroyer", "coords": [[4, 6], [4, 7]] },
      { "type": "Destroyer", "coords": [[6, 3], [7, 3]] },
      { "type": "Submarine", "coords": [[0, 6]] },
      { "type": "Submarine", "coords": [[8, 5]] },
      { "type": "Submarine", "coords": [[6, 5]] },
      { "type": "Submarine", "coords": [[0, 8]] }
    ]
  },
  {
    "name": "Lithuanian Layout 097",
    "ships": [
      { "type": "Battleship", "coords": [[6, 2], [7, 2], [8, 2], [9, 2]] },
      { "type": "Cruiser", "coords": [[6, 6], [6, 7], [7, 7]] },
      { "type": "Cruiser", "coords": [[3, 8], [3, 9], [4, 9]] },
      { "type": "Destroyer", "coords": [[1, 6], [1, 7]] },
      { "type": "Destroyer", "coords": [[3, 5], [3, 6]] },
      { "type": "Destroyer", "coords": [[2, 2], [3, 2]] },
      { "type": "Submarine", "coords": [[6, 4]] },
      { "type": "Submarine", "coords": [[7, 9]] },
      { "type": "Submarine", "coords": [[4, 0]] },
      { "type": "Submarine", "coords": [[9, 5]] }
    ]
  },
  {
    "name": "Lithuanian Layout 098",
    "ships": [
      { "type": "Battleship", "coords": [[8, 3], [8, 4], [8, 5], [9, 4]] },
      { "type": "Cruiser", "coords": [[0, 9], [1, 9], [2, 9]] },
      { "type": "Cruiser", "coords": [[6, 8], [7, 8], [7, 9]] },
      { "type": "Destroyer", "coords": [[0, 3], [1, 3]] },
      { "type": "Destroyer", "coords": [[2, 0], [2, 1]] },
      { "type": "Destroyer", "coords": [[0, 6], [1, 6]] },
      { "type": "Submarine", "coords": [[5, 6]] },
      { "type": "Submarine", "coords": [[9, 8]] },
      { "type": "Submarine", "coords": [[9, 1]] },
      { "type": "Submarine", "coords": [[6, 0]] }
    ]
  },
  {
    "name": "Lithuanian Layout 099",
    "ships": [
      { "type": "Battleship", "coords": [[0, 6], [1, 6], [2, 5], [2, 6]] },
      { "type": "Cruiser", "coords": [[5, 7], [6, 6], [6, 7]] },
      { "type": "Cruiser", "coords": [[2, 2], [3, 2], [3, 3]] },
      { "type": "Destroyer", "coords": [[4, 0], [5, 0]] },
      { "type": "Destroyer", "coords": [[7, 4], [8, 4]] },
      { "type": "Destroyer", "coords": [[2, 8], [3, 8]] },
      { "type": "Submarine", "coords": [[7, 2]] },
      { "type": "Submarine", "coords": [[5, 3]] },
      { "type": "Submarine", "coords": [[4, 5]] },
      { "type": "Submarine", "coords": [[0, 1]] }
    ]
  },
  {
    "name": "Lithuanian Layout 100",
    "ships": [
      { "type": "Battleship", "coords": [[1, 5], [2, 4], [2, 5], [2, 6]] },
      { "type": "Cruiser", "coords": [[2, 8], [2, 9], [3, 9]] },
      { "type": "Cruiser", "coords": [[9, 6], [9, 7], [9, 8]] },
      { "type": "Destroyer", "coords": [[7, 8], [7, 9]] },
      { "type": "Destroyer", "coords": [[6, 5], [6, 6]] },
      { "type": "Destroyer", "coords": [[8, 1], [9, 1]] },
      { "type": "Submarine", "coords": [[4, 4]] },
      { "type": "Submarine", "coords": [[5, 2]] },
      { "type": "Submarine", "coords": [[3, 2]] },
      { "type": "Submarine", "coords": [[5, 8]] }
    ]
  }
];
