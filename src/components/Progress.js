import React from 'react';

export default function Progress({ selectedCells, flaggedCells, board }) {
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
    </div>
  )
}
