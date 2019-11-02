import React, { useState, useEffect } from 'react';

export default function({ gameRunning, gameOver, gameWon }) {
  const [seconds, setSeconds] = useState(1);

  useEffect(() => {
    let interval = null;

    if (gameRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (gameOver) {
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [seconds, gameRunning, gameOver]);

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
