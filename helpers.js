const countFlagged = cell => cell.neighbors.reduce((sum, cell) => sum + +cell.flagged, 0);
const countUnflagged = cell => cell.neighborMines - countFlagged(cell);
const countMines = cell => cell.neighbors.reduce((sum, cell) => sum + +cell.mine, 0);

const getUnknown = cell => cell.neighbors.filter(neighbor => !(neighbor.shown || neighbor.flagged));
const flagAll = cells => cells.forEach(cell => cell.flagged = true);
const placeFlags = cell => {
  const dangerous = getUnknown(cell);
  const unflagged = countUnflagged(cell);
  if (dangerous.length === unflagged) {
    flagAll(dangerous);
    return unflagged;
  }
  return 0;
};
const showUnknown = cell => getUnknown(cell).forEach(cell => cell.show());

const show = function() {
  if (!this.shown) {
    this.shown = true;
    if (!this.neighborMines) {
      this.neighbors.forEach(neighbor => neighbor.show());
    }
  }
}

const logBoard = board => board.forEach(row => {
  console.log('');
  row.forEach(({mine, flagged, shown, neighborMines}) => {
    process.stdout.write(`${mine ? 'X' : 'o'}${flagged ? '!' : '_'}${shown ? '#' : '-'}${neighborMines} `);
  });
});

const checkNotDone = board => !board.reduce((allRows, row) => allRows.concat(row))
  .reduce((allFlaggedOrShown, { flagged, shown }) => allFlaggedOrShown && (flagged || shown), true);

module.exports = {
  countFlagged,
  countUnflagged,
  countMines,
  getUnknown,
  flagAll,
  placeFlags,
  showUnknown,
  show,
  logBoard,
  checkNotDone,
}