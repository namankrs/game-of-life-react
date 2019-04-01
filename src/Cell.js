class Cell {
  constructor() {
    this.state = { isAlive: false };
  }

  toggle() {
    if (this.state.isAlive) {
      this.setState({ isAlive: false });
      return;
    }
    this.setState({ isAlive: true });
  }

  isCellAlive() {
    return this.state.isAlive;
  }
}

export default Cell;
