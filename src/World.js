import React from "react";
import Cell from "./Cell";
import "./index.css";

class World {
  constructor() {
    this._initialize();
  }

  _initialize() {
    this.cells = new Array(10).fill(new Array(10).fill(new Cell()));
  }

  handleEvent(event) {
    console.log(event.target.id);
  }

  generateDisplay() {
    const toRender = this.cells.map((row, rowIndex) => {
      return (
        <div key={rowIndex}>
          {row.map((cell, columnIndex) => (
            <button
              onClick={this.handleEvent}
              className="alive-cell"
              key={rowIndex + "_" + columnIndex}
              id={rowIndex + "_" + columnIndex}
            />
          ))}
        </div>
      );
    });
    return toRender;
  }
}

export default World;
