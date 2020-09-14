// Model
class App {
  constructor() {

    this.state = {
      playerTurn: 1,
      symbols: ['', 'X', 'O'],
      onClick: this.update,
      gameOver: false,
    }

    this.state.grid = new Grid(this.state);

    // reset button
    let app = document.getElementById('app');
    let resetButton = document.createElement('button');
    let resetText = document.createTextNode('Reset Game');
    resetButton.appendChild(resetText);
    resetButton.addEventListener('click', this.reset.bind(this));
    app.appendChild(resetButton);

    // win message
    this.state.winMessage = document.createElement('h2');
    this.state.winMessage.innerHTML = '';
    app.appendChild(this.state.winMessage);
  }

  // resets the game
  reset() {
    this.state.gameOver = false;
    this.state.grid.clear();
    this.state.winMessage.innerHTML = '';
  }

  // click callback for updating game
  update() {
    if (!this.state.gameOver) {
      // add O/X to element
      let symbol = this.state.symbols[this.state.playerTurn];

      // make sure cell is empty
      if (!this.getCellState()) {
        this.getElement().innerHTML = symbol;
        this.setCellState(symbol);
      }

      // check win condition
      if (this.state.grid.checkWinCondition()) {
        this.state.gameOver = true;
        this.state.winMessage.innerHTML = `Player ${this.state.playerTurn} won!`;
      };

      // change player turn
      if (this.state.playerTurn === 1) {
        this.state.playerTurn = 2;
      } else {
        this.state.playerTurn = 1;
      }
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
        this._grid[i][j] = new Cell(state);
      }
    }

    this.renderTable();
  }

  // resets the grid
  clear() {
    for (let i = 0; i < this._grid.length; i++) {
      for (let j = 0; j < this._grid[i].length; j++) {
        let cell = this._grid[i][j];
        cell.getElement().innerHTML = this.state.symbols[0];
        cell.setCellState('');
      }
    }
  }

  // checks if a row or column has a win
  isRowColumnWin() {
    for (let i = 0; i < this._grid.length; i++) {
      let state = this._grid[i][0].getCellState();
      if (state && state === this._grid[i][1].getCellState() && state === this._grid[i][2].getCellState()) {
        return true;
      }
      state = this._grid[0][i].getCellState();
      if (state && state === this._grid[1][i].getCellState() && state === this._grid[2][i].getCellState()) {
        return true;
      }
    }
    return false;
  }

  // checks if a diagonal has a win
  isDiagonalWin() {
    let majorCellState = this._grid[0][0].getCellState();
    let minorCellState = this._grid[0][2].getCellState();
    if (majorCellState && majorCellState === this._grid[1][1].getCellState() && majorCellState === this._grid[2][2].getCellState()) {
      return true;
    }
    if (minorCellState && minorCellState === this._grid[1][1].getCellState() && minorCellState === this._grid[2][0].getCellState()) {
      return true;
    }
    return false;
  }

  // returns whether win condition satisfied or not
  checkWinCondition() {
    return (this.isRowColumnWin() || this.isDiagonalWin());
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
class Cell {
  constructor(state) {
    this.state = state;
    // whether block has an O, X, or empty
    this._text = '';
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

  setCellState(state) {
    this._text = state;
    this._element.innerHTML = state;
  }

  getCellState() {
    return this._text;
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