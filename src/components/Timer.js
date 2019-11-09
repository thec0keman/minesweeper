import React, { useState, useEffect } from 'react';

export default function({ gameRunning, gameOver, gameWon }) {
  const [seconds, setSeconds] = useState(1);

  useEffect(() => {
    // Use `setInterval` so that if this component tears down mid-tick, we can stop
    // the next tick.
    let interval = null;

    if (gameRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  });

  const classes = gameWon ? 'timer won' : 'timer';

  if (gameRunning || gameOver) {
    return (
      <div className={classes}>
        {seconds}
      </div>
    )
  } else {
    return <div className='timer-blank'/>
  }
}
