import React from 'react';
import Row from './Row';
import Timer from './Timer';
import Progress from './Progress';

export default function Board({ board, gameRunning, gameOver, gameWon, selectedCells, flaggedCells }) {
  const rows = board
    .rows
    .map((row, y) => (
      <Row row={row} data-y={y} key={y} />
    ));

  let message;

  if (gameOver && gameWon) {
    message = 'Congratulations, you win!';
  } else if (gameOver) {
    message = 'Sorry, please try again :(';
  }

  return (
    <div className='game'>
      <Progress selectedCells={selectedCells} flaggedCells={flaggedCells} board={board}/>
      <Timer gameRunning={gameRunning} gameOver={gameOver} gameWon={gameWon}/>

      <div className='board'>{rows}</div>
      <p>{message}</p>
    </div>
  )
}
