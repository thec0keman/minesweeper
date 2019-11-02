import React from 'react';
import Cell from '../containers/cell';

export default function Row(props) {
  const cells = props.row.map((cell, x) => {
    return (
      <Cell
        data-column={x}
        key={cell.id}
        cell={cell}
      />
    );
  });

  return (
    <div data-row={props.y} key={props.y} className='row'>
      {cells}
    </div>
  )
}
