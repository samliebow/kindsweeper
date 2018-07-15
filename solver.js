const solver = (board, mines) => {
  let shownCells = board.reduce((allRows, row) => allRows.concat(row))
    .filter(cell => cell.shown);
  shownCells.forEach(cell => {
    placeFlags(cell);
    if (!cell.unflagged) {
      showUnknown(cell);
      if (!checkValid(cell)) { throw new Error('Lost the game'); }
    }
  });
}

const checkValid = ({ neighbors }) => neighbors.reduce((valid, cell) => valid && !(cell.mine && cell.shown), true)