import React, { useState, useEffect } from 'react';

export default function(props) {
  const [seconds, setSeconds] = useState(1);

  useEffect(() => {
    let interval = null;

    if (props.gameRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (props.gameOver) {
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [seconds, props.gameRunning, props.gameOver]);

  if (props.gameRunning || props.gameOver) {
    return (
      <div className='timer'>
        {seconds}
      </div>
    )
  } else {
    return <div className='timer-blank'/>
  }
}
