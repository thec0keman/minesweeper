import React from 'react';

export default function Progress({ selectedCells, flaggedCells, board, gameWon, gameOver }) {
  let message;

  if (gameOver && gameWon) {
    message = <div>Congratulations, you win!</div>
  } else if (gameOver) {
    message = <div>Sorry, please try again :(</div>
  }

  return (
    <div className='progress'>
      <dl>
        <dt>Cells</dt>
        <dd>{selectedCells.length} / {board.totalCells}</dd>
      </dl>
      <dl>
        <dt>Flags</dt>
        <dd>{flaggedCells.length} / {board.totalMines}</dd>
      </dl>
      {message}
    </div>
  )
}
