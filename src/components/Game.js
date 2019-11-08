import React from 'react';
import Difficulty from '../containers/difficulty';
import Board from '../containers/board';
import detonator from '../lib/detonator';

export default class Game extends React.Component {
  detonate(cell) {
    const board = this.props.board;
    const explode = (mine) => {
      this.props.chainReaction(mine)
    }

    this.detonator = new detonator(board.mines);
    this.detonator.start(explode);
  }

  componentWillUnmount() {
    this.detonator && this.detonator.stop();
  }

  render() {
    const {
      difficulty,
      clearDifficulty,
      resetGame,
      detonate
    } = this.props;

    if (detonate) {
      this.detonate(detonate);
    }

    if (!!difficulty) {
      return (
        <section>
          <button onClick={clearDifficulty}>Change Difficulty</button>
          <button onClick={resetGame}>Start Over</button>
          <Board/>
        </section>
      )
    } else {
      return (
        <Difficulty/>
      )
    }
  }
}
