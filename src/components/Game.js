import React from 'react';
import Board from './Board';
import GameBoard from '../lib/GameBoard';
import detonator from '../lib/detonator';

export default class Game extends React.Component {
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
      board: new GameBoard(props.height, props.width, props.density),
      selectedCells: [],
      flaggedCells: [],
      exploded: [],
      gameRunning: false,
      gameOver: false
    };
  }

  // @TODO Ensure first click is a zero
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
      this.clearCells(cell);
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

    const board = this.state.board;
    const explode = (mine) => {
      this.setState({
        exploded: [
          ...this.state.exploded,
          mine
        ]
      });
    }

    this.detonator = new detonator(board.mines);
    this.detonator.start(explode);
  }

  componentWillUnmount() {
    this.detonator.stop();
  }

  clearCells(cell) {
    const board = this.state.board;
    const newVisible = [
      ...this.state.selectedCells,
      cell
    ];
    const chainedCells = board.fetchChainedCells([cell], newVisible);

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
      <section>
        <button onClick={this.reset}>Start Over</button>
        <Board
          board={this.state.board}
          flagCell={this.flagCell}
          clickCell={this.clickCell}
          {...this.state}
        />
      </section>
    )
  }
}
