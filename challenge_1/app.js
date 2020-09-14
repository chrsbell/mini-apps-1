// Model
class App {
  constructor() {

    this.state = {
      playerTurn: 1,
      symbols: ['', 'X', 'O'],
      onClick: this.update,
    }

    this.state.grid = new Grid(this.state);

    // add reset button
    let app = document.getElementById('app');
    let resetButton = document.createElement('button');
    let resetText = document.createTextNode('Reset Game');
    resetButton.appendChild(resetText);
    app.appendChild(resetButton);
  }

  // resets the game
  reset() {

  }

  // update game
  update() {
    // add O/X to element
    let symbol = this.state.symbols[this.state.playerTurn];
    this.getElement().innerHTML = symbol;
    this.setState(symbol);
    // check win condition
    if (this.state.grid.checkWinCondition()) {
      debugger;
    };

    // change player turn
    if (this.state.playerTurn === 1) {
      this.state.playerTurn = 2;
    } else {
      this.state.playerTurn = 1;
    }
  }
}

class Grid {
  constructor(state) {
    // internal representation
    this.state = state;
    this._grid = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];

    // add individual blocks
    for (let i = 0; i < this._grid.length; i++) {
      for (let j = 0; j < this._grid[i].length; j++) {
        this._grid[i][j] = new Block(state);
      }
    }

    this.renderTable();
  }

  // resets the grid
  clear() {
    for (let i = 0; i < this._grid.length; i++) {
      for (let j = 0; j < this._grid[i].length; j++) {
        this._grid[i][j].getElement().innerHTML = this.state.symbols[0];
      }
    }
  }

  // checks if a row has a win
  isRowWin() {
    for (let i = 0; i < this._grid.length; i++) {
      let state = this._grid[i][0].getState();
      if (state && state === this._grid[i][1].getState() && state === this._grid[i][2].getState()) {
        return true;
      }
    }
    return false;
  }

  isColumnWin() {

  }

  isDiagonalWin() {

  }

  // returns whether win condition satisfied or not
  checkWinCondition() {
    return (this.isRowWin() || this.isColumnWin() || this.isDiagonalWin());
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
  constructor(state) {
    this.state = state;
    // whether block has an O, X, or empty
    this._state = '';
    // internal reference to DOM td element
    this._element = null;
  }
  setElement(element) {
    this._element = element;
    // perform game logic using the block that triggered the update call
    this._element.addEventListener('click', this.state.onClick.bind(this));
  }
  getElement() {
    return this._element;
  }
  setState(state) {
    this._state = state;
    this._element.innerHTML = state;
  }
  getState() {
    return this._state;
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