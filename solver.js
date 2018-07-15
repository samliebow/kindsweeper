const fs = require('fs');
const { countUnflagged, placeFlags, showUnknown, logBoard, 
        checkIfDone, checkValid, deleteNeighborsForJson} = require('./helpers.js');

const solver = (board) => {
  let makingProgress = true;
  let done = false;

  while (!done && makingProgress) {
    makingProgress = false;
    // Filter for shown cells with at least one unresolved neighbor
    let workingCells = board.reduce((allRows, row) => allRows.concat(row))
      .filter(cell => cell.shown && cell.neighborMines)
      .filter(cell => cell.neighbors.filter(({ flagged, shown }) =>  !(flagged || shown)).length);

    workingCells.forEach(cell => {
      makingProgress = !!placeFlags(cell); // If we've flagged, we're progressing
      if (!countUnflagged(cell)) {
        showUnknown(cell);
        // A working cell should have had a hidden, unflagged neighbor
        // so if it doesn't now, we're making progress
        makingProgress = true;
        if (!checkValid(cell)) {
          logBoard(board);
          deleteNeighborsForJson(board);
          fs.writeFile('./badCase.json', JSON.stringify(board), () => {});
          throw new Error('Lost the game'); 
        }
      }
    });
    done = checkIfDone(board);
  }
  console.log(makingProgress ? '\nSolution found' : '\nSolution not found');
  logBoard(board);
  return done;
}

module.exports = solver;