import React from 'react';
import Row from './Row';
import Timer from './Timer';
import Progress from './Progress';

export default function Board(props) {
  const board = props.board;
  const rows = board.rows.map((row, y) => (<Row row={row} data-y={y} key={y} {...props}/>));

  return (
    <div className='game'>
      <Progress {...props}/>
      <Timer gameRunning={props.gameRunning} gameOver={props.gameOver}/>

      <div className='board'>{rows}</div>
    </div>
  )
}
