import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCog as explode,
  faFlag as flag,
  faBomb as bomb
} from '@fortawesome/free-solid-svg-icons'
import { colorMap } from '../lib/color-map'

export default function Cell({ cell, isFlagged, isVisible, isExploded, flagCell, clickCell }) {
  if (isFlagged) {
    return (
      <div className="cell raised flag">
        <FontAwesomeIcon icon={flag} onContextMenu={(e) => { flagCell(e, cell) }}/>
      </div>
    )

  } else if (!isVisible) {
    return (
      <div className="cell raised" onContextMenu={(e) => { flagCell(e, cell) }} onClick={(e) => { clickCell(e, cell) }}>
      </div>
    )

  } else if (isExploded) {
    return (
      <div className="cell detonate">
        <FontAwesomeIcon icon={explode}/>
      </div>
    )

  } else if (cell.isMine) {
    return (
      <div className="cell bomb">
        <FontAwesomeIcon icon={bomb}/>
      </div>
    )

  } else if (cell.number !== 0) {
    const colorClass = colorMap[cell.number];

    return (
      <div className={ 'cell ' + colorClass }>
        {cell.number}
      </div>
    )

  } else {
    return (
      <div className="cell empty"/>
    )
  }
}
