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

  return (
    <div className='game'>
      <Progress selectedCells={selectedCells} flaggedCells={flaggedCells} gameWon={gameWon} gameOver={gameOver} board={board}/>
      <Timer gameRunning={gameRunning} gameOver={gameOver} gameWon={gameWon}/>

      <div className='board'>{rows}</div>
    </div>
  )
}
