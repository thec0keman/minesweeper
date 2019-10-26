import React from 'react';
import Row from './Row';
import Timer from './Timer';

export default function Board(props) {
  const board = props.board;
  const rows = board.rows.map((row, y) => (<Row row={row} data-y={y} key={y} {...props}/>));

  return (
    <div className='game'>
      <button onClick={props.reset}>Start Over</button>
      <div className='progress'>
        Cells: {props.selectedCells.length} / {props.board.totalCells}
        <br/>
        Flags: {props.flaggedCells.length} / {props.board.totalMines}
      </div>

      <Timer gameRunning={props.gameRunning} gameOver={props.gameOver}/>

      <div className='board'>{rows}</div>
    </div>
  )
}
