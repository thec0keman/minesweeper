import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCog as explode,
  faFlag as flag,
  faBomb as bomb
} from '@fortawesome/free-solid-svg-icons'
import { colorMap } from '../lib/color-map'

export default function Cell({ cell, isFlagged, isVisible, isExploded, flagCell, clickCell }) {
  if (isExploded) {
    return (
      <div data-test-detonated className="cell detonate">
        <FontAwesomeIcon icon={explode}/>
      </div>
    )

  } else if (isFlagged) {
    return (
      <div data-test-flagged className="cell raised flag"  onContextMenu={(e) => { flagCell(e, cell) }}>
        <FontAwesomeIcon icon={flag}/>
      </div>
    )

  } else if (!isVisible) {
    return (
      <div data-test-hidden className="cell raised" onContextMenu={(e) => { flagCell(e, cell) }} onClick={(e) => { clickCell(e, cell) }}>
      </div>
    )

  } else if (cell.isMine) {
    return (
      <div data-test-visible-mine className="cell bomb">
        <FontAwesomeIcon icon={bomb}/>
      </div>
    )

  } else if (cell.number !== 0) {
    const colorClass = colorMap[cell.number];

    return (
      <div data-test-visible className={ 'cell ' + colorClass }>
        {cell.number}
      </div>
    )

  } else {
    return (
      <div data-test-empty className="cell empty"/>
    )
  }
}
