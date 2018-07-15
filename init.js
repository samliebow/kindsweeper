const createEmptyBoard = (height, width) => 
  Array(height).fill()
    .map(el => Array(width).fill()
      .map(el => ({
        mine: false,
        flagged: false,
        shown: false,
        neighbors: [],
        neighborMines: 0,
      }));
    );

const initState = mines => ({
  mines,
  flags: 0,
  unflaggedMines: mines,
});

const placeMines = (board, minesToPlace) => {
  while (minesToPlace) {
    const randRow = Math.floor(Math.random() * board.length);
    const randCol = Math.floor(Math.random() * board[0].length);
    const cell = board[randRow][randCol];
    if(!cell.mine) {
      cell.mine = true;
      minesToPlace--;
    }
  }
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