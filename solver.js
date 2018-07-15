const fs = require('fs');
const { countUnflagged, placeFlags, showUnknown, logBoard, checkNotDone } = require('./helpers.js');
const init = require('./init.js');

const solver = (board, mines) => {
  let makingProgress = true;

  while (checkNotDone(board) && makingProgress) {
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
  }
  console.log(makingProgress ? 'Solution found' : 'Solution not found');
  logBoard(board);
  deleteNeighborsForJson(board);
  makingProgress ? fs.writeFile('./goodCase.json', JSON.stringify(board), () => {}) :
    fs.writeFile('./insolvableCase.json', JSON.stringify(board), () => {});
}

const checkValid = ({ neighbors }) => neighbors.reduce((valid, cell) => valid && !(cell.mine && cell.shown), true);
const deleteNeighborsForJson = board => board.reduce((allRows, row) => allRows.concat(row)).forEach(cell => delete cell.neighbors);

const randStart = [Math.floor(Math.random * 5), Math.floor(Math.random * 5)];
const [state, board] = init(3, 5, 5, [1, 2]);
solver(board, state.mines);