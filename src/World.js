import React from "react";
import Cell from "./Cell";
import "./index.css";

class World extends React.Component {
  constructor(props) {
    super(props);
    this.cells = this.generateBoard(10, 10);
    this.initialStates = [];
    this.state = { cells: this.generateBoard(10, 10) };
  }

  // _initialize() {
  //   this.cells = new Array(10).fill(new Array(10).fill(new Cell()));
  // }

  render() {
    return this.generateDisplay(
      initialiseBoard(this.state.cells, this.initialStates)
    );
  }
  handleEvent(event) {
    event.target.className = "alive-cell";
    const id = event.target.id.split("_");
    this.initialStates.push(id);
  }

  generateBoard(length, breadth) {
    return new Array(breadth)
      .fill()
      .map(x => new Array(length).fill().map(x => " "));
  }

  generateDisplay(board = this.cells) {
    const toRender = board.map((row, rowIndex) => {
      return (
        <div key={rowIndex}>
          {row.map((cell, columnIndex) => {
            let toSetClass = "dead-cell";
            if (cell === "*") {
              toSetClass = "alive-cell";
            }
            return (
              <button
                onClick={this.handleEvent.bind(this)}
                className={toSetClass}
                key={rowIndex + "_" + columnIndex}
                id={rowIndex + "_" + columnIndex}
              />
            );
          })}
        </div>
      );
    });
    toRender.push(
      <button className="start" onClick={this.iterate.bind(this)}>
        Start
      </button>
    );
    return toRender;
  }

  iterate() {
    const initialBoard = initialiseBoard(this.cells, this.initialStates);
    const newBoard = cycleGenerator(10, 10, initialBoard);
    console.log(newBoard);
    this.setState(state => {
      return { cells: newBoard };
    });
  }
}

export default World;

// const generateInitialBoard = function(length, breadth, initialStates) {
//   let board = generateBoard(length, breadth);
//   return initialiseBoard(board, initialStates);
// };

const initialiseBoard = function(board, initialStates) {
  let grid = board.slice("");

  for (let index = 0; index < initialStates.length; index++) {
    grid[initialStates[index][0]][initialStates[index][1]] = "*";
  }
  return grid;
};

const getNeighbours = function([rowIndex, columnIndex]) {
  let points = [-1, 0, 1];
  let neighbours = [];
  points.forEach(x => {
    points.forEach(y => {
      if (x != 0 || y != 0) neighbours.push([rowIndex + x, columnIndex + y]);
    });
  });

  return neighbours;
};

const destiny = function(lifeCount, state) {
  let states = {
    living: [" ", " ", "*", "*", " ", " ", " ", " ", " "],
    dead: [" ", " ", " ", "*", " ", " ", " ", " ", " "]
  };

  return states[state][lifeCount];
};

const getLifeCount = function(board, validNeighbours) {
  const isNeighbourValid = function(neighbour) {
    return board[neighbour[0]][neighbour[1]] == "*";
  };

  let lifeBoard = validNeighbours.filter(isNeighbourValid);
  return lifeBoard.length;
};

const validateNeighbours = function(neighbours, length, breadth) {
  let isWithinLength = generateIsBetween(-1, length);
  let isWithinBreadth = generateIsBetween(-1, breadth);
  let validNeighbours = neighbours.filter(
    ([x, y]) => isWithinBreadth(x) && isWithinLength(y)
  );
  return validNeighbours;
};

const generateIsBetween = function(lowerLimit, upperLimit) {
  return function(candidate) {
    return candidate > lowerLimit && candidate < upperLimit;
  };
};
/////////////////////////////////most important/////////////////////////////////////
const makeInstance = function(length, breadth, [row, col], board) {
  let resultBoard = board.map(x => x.slice());
  let neighbours = getNeighbours([row, col]);
  neighbours = validateNeighbours(neighbours, length, breadth);
  let aliveNeighboursCount = getLifeCount(resultBoard, neighbours);

  let state = "dead";
  if (resultBoard[row][col] == "*") state = "living";

  return destiny(aliveNeighboursCount, state);
};

const cycleGenerator = function(length, breadth, board) {
  let currentBoard = board.map(x => x.slice());
  for (let row = 0; row < breadth; row++) {
    for (let column = 0; column < length; column++) {
      currentBoard[row][column] = makeInstance(
        length,
        breadth,
        [row, column],
        board
      );
    }
  }
  return currentBoard;
};

// const generateInstances = function(length, breadth, initialStates) {
//   let board = generateBoard(length, breadth);
//   board = initialiseBoard(board, initialStates);
//   let resultBoard = board.map(x => x.slice());

//   resultBoard = cycleGenerator(length, breadth, resultBoard);
//   return resultBoard;
// };
