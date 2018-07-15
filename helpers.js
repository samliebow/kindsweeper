const countFlagged = cell => cell.neighbors.reduce((sum, cell) => sum + +cell.flagged, 0);
const countUnflagged = cell => cell.neighborMines - countFlagged(board, row, col);
const countMines = cell => cell.neighbors.reduce((sum, cell) => sum + +cell.mine, 0);

const getUnknown = cell => cell.neighbors.filter(neighbor => !(neighbor.shown || neighbor.flagged));
const flagAll = cells => cells.forEach(cell => cell.flagged = true);
const placeFlags = cell => {
  const dangerous = getUnknown(cell);
  const unflagged = countUnflagged(cell);
  if (dangerous.length === unflagged) {
    flagAll(dangerous);
  }
};
const showUnknown = cell => getUnknown(cell).forEach(cell => cell.shown = true);

module.exports = {
  countFlagged,
  countUnflagged,
  countMines,
  getUnknown,
  flagAll,
  placeFlags,
  showUnknown,
}