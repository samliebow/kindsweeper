const { countMines, show } = require('./helpers.js');

const createEmptyBoard = (height, width) => 
  Array(height).fill()
    .map(el => Array(width).fill()
      .map(el => ({
        mine: false,
        flagged: false,
        shown: false,
        neighbors: [],
        neighborMines: 0,
        show,
      }))
    );

const initState = mines => ({
  mines,
  flags: 0,
  unflaggedMines: mines,
});

const placeMines = (board, minesToPlace, startCell) => {
  while (minesToPlace) {
    const randRow = Math.floor(Math.random() * board.length);
    const randCol = Math.floor(Math.random() * board[0].length);

    const cell = board[randRow][randCol];
    if (!(cell.mine || cell === startCell)) {
      cell.mine = true;
      minesToPlace--;
    }
  }
  return board;
}

const getNeighbors = (board, row, col) => {
  const cell = board[row][col];
  const neighbors = [];
  const validRows = [board[row - 1], board[row], board[row + 1]].filter(el => el);
  const neighbors2D = validRows.map(row => [row[col - 1], row[col], row[col + 1]]
    .filter(el => el && el !== cell))
  neighbors2D.forEach(arr => neighbors.push(...arr));
  return neighbors;
};

const init = (mines, height, width, start) => {
  const state = initState(mines);
  const board = createEmptyBoard(height, width);
  const [startRow, startCol] = start;
  const startCell = board[startRow][startCol];
  placeMines(board, mines, startCell);
  board.forEach((row, i) => row.forEach((cell, j) => {
    cell.neighbors = getNeighbors(board, i, j);
    cell.neighborMines = countMines(cell);
  }));
  startCell.show();
  return [state, board];
}

module.exports = init;

// init(5,5,5)[1].forEach(row => {
//   row.forEach(({mine, neighborMines})=> 
//     process.stdout.write(`[${+mine}, ${neighborMines}]`)
//   )
//   console.log('');
// })