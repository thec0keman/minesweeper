import Board from '../containers/board';
import Detonator from '../containers/detonator';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Game({ resetGame, difficulty, history, setDifficultyFromUrl }) {
  const goHome = () => history.push('/');
  const { difficulty: difficultyFromUrl } = useParams();

  if (!difficulty) {
    if (!setDifficultyFromUrl(difficultyFromUrl)) {
      goHome();
    }

    return (null);
  }

  return (
    <section>
      <button onClick={goHome}>Change Difficulty</button>
      <button onClick={resetGame}>Start Over</button>
      <Board/>
      <Detonator/>
    </section>
  )
}
