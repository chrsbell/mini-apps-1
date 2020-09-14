// Model
class App {
  constructor() {
    // representation of tic-tac-toe grid
    this.grid = new Grid();
  }
}

class Grid {
  constructor() {
    // internal representation
    this._grid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    for (let column of this._grid) {
      for (let block of column) {
        block = new Block();
      }
    }
  }
}

// Individual tic-tac-toe block
class Block {
  constructor() {
    // whether block has an O, X, or empty
    this.state = '';
  }
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
  }
}

let main = () => {
  // main entry point for app
  let game = new App();
}

main();