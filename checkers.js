'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class checker {
  constructor() {
  this.symbol = "";
}
}


function Checker(color) {
  // Your code here
  //The symbol that is assigned is based on what color ('white' or 'black') the checker will be. 
  // Let's pass in the color as an argument, function Checker(color) { 
  //... and set the Checker instance's this.symbol. 
  // if the color is 'white, set this.symbol equal to String.fromCharCode(0x125CB), 
  //otherwise set it equal to String.fromCharCode(0x125CF).
  let newChecker = checker;
  if (color==="white") {
    newChecker.symbol= String.fromCharCode(0x125CB);
  } else newChecker.symbol=String.fromCharCode(0x125CF);
  return newChecker;
}

class Board {
  constructor() {
    this.grid = []
    //In your Board class, create an attribute called this.checkers and assign it to an empty array.
    this.checkers = [];
  }
  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }

  // Your code here
  //Now create a method called this.createCheckers. 
  //In it, let's define our starting positions of the checkers on the grid. 
  //In local variables, define whitePositions and blackPositions as array of [row, column] coordinates:
   createCheckers() {
    let whitePositions=[[0, 1], [0, 3], [0, 5], [0, 7],
    [1, 0], [1, 2], [1, 4], [1, 6],
    [2, 1], [2, 3], [2, 5], [2, 7]];

    let blackPositions = [[5, 0], [5, 2], [5, 4], [5, 6],
    [6, 1], [6, 3], [6, 5], [6, 7],
    [7, 0], [7, 2], [7, 4], [7, 6]];

    //In a for loop, iterate over the range from 0 - 11, with each index you want to:
    // Instantiate a 'white' Checker
    // Place that checker on the grid at the position corresponding with the index in the positions array
    // Push the checker into your this.checkers array
    for (let i = 0; i<12;i++){
      let whiteChecker = Checker('white');
      this.grid[whitePositions[i][0]][whitePositions[i][1]] = whiteChecker;
      this.checkers.push(whiteChecker);
    }
    // Do all three steps above for a 'black' checker
    for (let i = 0; i<12;i++){
      let blackChecker = Checker('black');
      this.grid[blackPositions[i][0]][blackPositions[i][1]]=blackChecker;
      this.checkers.push(blackChecker);
    }
   }

  // In your Board class, write a method this.selectChecker that takes two arguments row, column. 
  // All this does is return the checker at that particular spot on this.grid. 
  // This will be a handy "helper" function.
   selectChecker(row,col) {
    return this.grid[row][col];
   }

   // In your Board class, write a method killChecker that take a single argument position 
   // which is a coordinate pair, eg. [0, 5]. 
   // In it, use this.selectChecker to grab the checker at the position given. 
   // Find the index of that checker in the this.checkers array. then remove it by .splice()ing it out. 
   // Then assign the position on this.grid to null. That checker is dead.
   killChecker (row,col) {
      let position = [row,col];
      let jumpedChecker = Checker(this.selectChecker(row,col));
      let checkerIndex = this.checkers.indexOf(position);
      this.checkers.splice(checkerIndex,1);
      this.grid[row][col]=null;

   }


}


class Game {
  constructor() {
    this.board = new Board;
  }
  start() {
    this.board.createGrid();
    //In your Game class, in the this.start method, add this.board.createCheckers()
    this.board.createCheckers();
 }
    //Next, in your Game class, create a this.moveChecker method that takes two parameters start, end.
   // These two arguments will each contain a row and a column, eg. 50, 41. 
   // Inside the method, use your board helper method selectChecker to select the checker 
   // at your starting rowcolumn coordinates and set it to a local variable checker. 
   // Then set that spot on the grid to null and set the spot at the end rowcolumn coordinate to the checker.
   moveChecker(start, end){
    let startCoordinateParse = start.split("");
    let startRow = parseInt(startCoordinateParse[0]);
    let startCol = parseInt(startCoordinateParse[1]);
    let endCoordParse = end.split("");
    let endRow = endCoordParse[0];
    let endCol = endCoordParse[1];
    let checker = this.board.selectChecker(startRow,startCol);
    this.board.grid[endRow][endCol]=checker;
    this.board.grid[startRow][startCol] = null;
    // In the Game class, in the moveChecker method, after you have moved the checker, 
    // check to see if the distance of the start row and the end row is 2 by finding the 
    // absolute value of the difference between the rows. If so, which means you must have jumped a checker, 
    // find the killPosition by finding the midpoint between the start and end positions. 
    // Then killChecker.
    let killPositionRow;
    let killPositionCol;
    if (Math.abs(endRow-startRow) === 2) {
      if (endRow>startRow){
        killPositionRow= startRow+1;
      } else killPositionRow = startRow - 1;
      if (endCol > startCol) {
        killPositionCol = startCol + 1;
      } else killPositionCol = startCol -1;
      this.board.killChecker(killPositionRow,killPositionCol);
    }
 
   }
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}