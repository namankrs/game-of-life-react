import React, { Component } from "react";
import logo from "./logo.svg";
import World from "./World";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.world = new World();
  }
  render() {
    return this.world.generateDisplay();
  }
}

export default App;
