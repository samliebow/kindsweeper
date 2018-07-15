const countUnflaggedForCell = cell => cell.neighborMines - countFlaggedForCell(board, row, col);

const countFlaggedForCell = cell => cell.neighbors.reduce((sum, cell) => sum + +cell.flagged, 0);

const getNeighbors = (board, row, col) => {
  const cell = board[row][col];
  const neighbors = [];
  const validRows = [board[row - 1], board[row], board[row + 1]].filter(el => el);
  const neighbors2D = validRows.map(row => [row[col - 1], row[col], row[col + 1]]
    .filter(el => el && el !== cell))
  neighbors2D.forEach(arr => neighbors.push(...arr));
  return neighbors;
};

module.exports = {
  countFlaggedForCell,
  countUnflaggedForCell,
  getNeighbors,
}