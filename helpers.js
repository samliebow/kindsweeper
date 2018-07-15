const countUnflaggedForCell = cell => cell.neighborMines - countFlaggedForCell(board, row, col);

const countFlaggedForCell = cell => cell.neighbors.reduce((sum, cell) => sum + +cell.flagged, 0);

module.exports = {
  countFlaggedForCell,
  countUnflaggedForCell,
}