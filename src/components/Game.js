import React from 'react';
import Board from './Board';
import generateBoard from '../lib/generate-board';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.reset = this.reset.bind(this);
    this.clickCell = this.clickCell.bind(this);
    this.flagCell = this.flagCell.bind(this);
    this.state = this._initGame();
  }

  _initGame() {
    const { props } = this;

    return {
      board: generateBoard(props.height, props.width, props.density),
      selectedCells: [],
      flaggedCells: [],
      exploded: [],
      gameRunning: false,
      gameOver: false
    };
  }

  clickCell(e, cell) {
    e.preventDefault();

    if (this.state.gameOver) {
      return;
    } else if (!this.state.gameRunning) {
      this.setState({ gameRunning: true });
    }

    if (cell.isMine) {
      this.detonate(cell);
    } else if (this.state.selectedCells.indexOf(cell) === -1) {
      this.startChainReaction(cell);
    }
  }

  flagCell(e, cell) {
    e.preventDefault();

    if (this.state.selectedCells.indexOf(cell) > -1) {
      return;
    }

    if (this.state.flaggedCells.indexOf(cell) > -1) {
      this.setState({
        flaggedCells: this.state.flaggedCells.filter(aCell => aCell.id !== cell.id)
      });
    } else {
      this.setState({
        flaggedCells: [
          ...this.state.flaggedCells,
          cell
        ],
      });
    }
  }

  // @TODO Detonate the minefield
  detonate(cell) {
    this.revealBoard()
    this.setState({
      exploded: [cell],
    });
  }

  startChainReaction(cell) {
    const board = this.state.board;
    const newVisible = [
      ...this.state.selectedCells,
      cell
    ];
    const chainedCells = board.startChainReaction([cell], newVisible);

    this.setState({
      selectedCells: chainedCells
    });

    if (chainedCells.length + board.totalMines === board.totalCells) {
      this.revealBoard();
    }
  }

  revealBoard() {
    const board = this.state.board;

    this.setState({
      gameOver: true,
      gameRunning: false,
      selectedCells: board.rows.flat()
    });
  }

  reset() {
    this.setState(this._initGame());
  }

  render() {
    return (
      <Board
        board={this.state.board}
        flagCell={this.flagCell}
        clickCell={this.clickCell}
        reset={this.reset}
        {...this.state}
      />
    )
  }
}

export default Game;
