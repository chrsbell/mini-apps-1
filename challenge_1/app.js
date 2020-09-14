// Model
class App {
  constructor() {
    // representation of tic-tac-toe grid
    this.grid = new Grid();

    // add reset button
    let app = document.getElementById('app');
    let resetButton = document.createElement('button');
    let resetText = document.createTextNode('Reset Game');
    resetButton.appendChild(resetText);
    app.appendChild(resetButton);
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

    // add individual blocks
    for (let i = 0; i < this._grid.length; i++) {
      for (let j = 0; j < this._grid[i].length; j++) {
        this._grid[i][j] = new Block();
      }
    }

    this.renderTable();
  }

  // creates a table in the DOM
  renderTable() {
    let app = document.getElementById('app');
    let table = document.createElement('table');
    for (let i = 0; i < this._grid.length; i++) {
      let tr = document.createElement('tr');
      for (let j = 0; j < this._grid[i].length; j++) {
        let td = document.createElement('td');
        // set reference to td element for each block
        this._grid[i][j].setElement(td);
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    app.appendChild(table);
  }
}

// Individual tic-tac-toe block
class Block {
  constructor() {
    // whether block has an O, X, or empty
    this.state = '';
    // reference to DOM td element
    this.element = null;
  }
  setElement(element) {
    this.element = element;
  }
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
  }
}

// main entry point for app
let main = () => {
  // make sure window has loaded first
  window.onload = () => {
    let game = new App();
  }
}

main();