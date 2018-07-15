const { countMines, show, copyBoard } = require('./helpers.js');
const solver = require('./solver.js');

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
};

const getNeighbors = (board, row, col) => {
  const cell = board[row][col];
  const neighbors = [];
  const validRows = [board[row - 1], board[row], board[row + 1]].filter(el => el);
  const neighbors2D = validRows.map(row => [row[col - 1], row[col], row[col + 1]]
    .filter(el => el && el !== cell))
  neighbors2D.forEach(arr => neighbors.push(...arr));
  return neighbors;
};

const createFinishedBoard = (mines, height, width, startRow, startCol) => {
  const board = createEmptyBoard(height, width);
  const startCell = board[startRow][startCol];
  placeMines(board, mines, startCell);
  board.forEach((row, i) => row.forEach((cell, j) => {
    cell.neighbors = getNeighbors(board, i, j);
    cell.neighborMines = countMines(cell);
  }));
  startCell.show();
  return board;
};

const verifySolvable = board => {
  const copiedBoard = copyBoard(board);
  copiedBoard.forEach((row, i) => row.forEach((cell, j) => {
    cell.neighbors = getNeighbors(copiedBoard, i, j);
  }));
  return solver(copiedBoard);
}

const init = (mines, height, width, startRow, startCol) => {
  const state = initState(mines);
  let board;
  let tries = 0;
  let solvable = false;
  while (!solvable && tries++ <= 100) {
    board = createFinishedBoard(mines, height, width, startRow, startCol);
    solvable = verifySolvable(board)
  }
  return solvable ? [state, board] : `Not solvable after a hundred tries`;
};

module.exports = init;