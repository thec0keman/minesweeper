import Board from '../containers/board';
import Detonator from '../containers/detonator';
import React from 'react';

export default function Game({ resetGame, difficulty, history, setDifficultyFromUrl }) {
  if (!difficulty) {
    const value = history.location.pathname.replace('/', '');

    setDifficultyFromUrl(value);
    return <div>Sorry, something went wrong</div>;
  }

  return (
    <section>
      <button onClick={() => history.push('/')}>Change Difficulty</button>
      <button onClick={resetGame}>Start Over</button>
      <Board/>
      <Detonator/>
    </section>
  )
}
