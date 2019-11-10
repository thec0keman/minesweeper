import { useEffect, useState } from 'react';

// Too low and the browser will choke on harder difficulties
// Too high and detonation will take forever
// const MINE_SPEED = 190;
// const MINE_SPEED = 90;
// const MINE_SPEED = 20;
const MINE_SPEED = {
  easy: 190,
  medium: 90,
  hard: 20,
  insane: 5
};

export default function({ board, clickedMine, chainReaction }) {
  const { mines, difficulty } = board;
  const [remaining, setRemaining] = useState([]);

  // This effect triggers the detonation.
  useEffect(() => {
    if (clickedMine) {
      setRemaining(prepareMines(mines, clickedMine));
    }
  }, [clickedMine]); // eslint-disable-line react-hooks/exhaustive-deps

  // Detonation effect.  Will abort if `clickedMine` is unset.
  useEffect(() => {
    if (!clickedMine || remaining.length === 0) {
      return;
    }

    const [mine, ...nextGroup] = remaining;

    chainReaction(mine.cell);

    if (nextGroup.length > 0) {
      let interval;
      const nextMineTime = Math.random() * MINE_SPEED[difficulty] // / mines.length;

      interval = setInterval(() => {
        setRemaining(nextGroup);
      }, nextMineTime)

      return () => clearInterval(interval);
    }
  }, [remaining, clickedMine]); // eslint-disable-line react-hooks/exhaustive-deps

  return (null);
}

// Calculates distances for each mine in the field from the clicked mine, and sorts
// the mines based on their distance from the clicked mine.
// Not for larger boards this can result in some initial latency
function prepareMines(mines, clicked) {
  return mines.map(cell => {
    const distance = Math.hypot(cell.x - clicked.x, cell.y - clicked.y);

    return {
      distance, cell
    };
  }).sort((a, b) => a.distance - b.distance);
}
