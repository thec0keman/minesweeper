import React from 'react';

export default function Progress(props) {
  return (
    <div className='progress'>
      <dl>
        <dt>Cells</dt>
        <dd>{props.selectedCells.length} / {props.board.totalCells}</dd>
      </dl>
      <dl>
        <dt>Flags</dt>
        <dd>{props.flaggedCells.length} / {props.board.totalMines}</dd>
      </dl>
    </div>
  )
}
