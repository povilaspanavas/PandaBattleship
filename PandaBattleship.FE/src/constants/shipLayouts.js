export const SHIP_LAYOUTS = [
  {
    name: "Classic",
    ships: [
      { type: 'Carrier', coords: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]] },
      { type: 'Battleship', coords: [[2, 2], [3, 2], [4, 2], [5, 2]] },
      { type: 'Destroyer', coords: [[7, 1], [7, 2], [7, 3]] },
      { type: 'Submarine', coords: [[5, 5], [5, 6], [5, 7]] },
      { type: 'Patrol Boat', coords: [[9, 8], [9, 9]] }
    ]
  },
  {
    name: "Scatter",
    ships: [
      { type: 'Carrier', coords: [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1]] },
      { type: 'Battleship', coords: [[8, 2], [8, 3], [8, 4], [8, 5]] },
      { type: 'Destroyer', coords: [[0, 7], [1, 7], [2, 7]] },
      { type: 'Submarine', coords: [[5, 8], [6, 8], [7, 8]] },
      { type: 'Patrol Boat', coords: [[4, 4], [4, 5]] }
    ]
  },
  {
    name: "Edge",
    ships: [
      { type: 'Carrier', coords: [[0, 9], [1, 9], [2, 9], [3, 9], [4, 9]] },
      { type: 'Battleship', coords: [[9, 0], [9, 1], [9, 2], [9, 3]] },
      { type: 'Destroyer', coords: [[0, 0], [1, 0], [2, 0]] },
      { type: 'Submarine', coords: [[5, 0], [6, 0], [7, 0]] },
      { type: 'Patrol Boat', coords: [[9, 8], [9, 9]] }
    ]
  }
];