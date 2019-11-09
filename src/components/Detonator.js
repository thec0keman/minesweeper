import { useEffect } from 'react';
import Detonator from '../lib/detonator';

export default function({ board, detonate, chainReaction }) {
  useEffect(() => {
    if (detonate) {
      const detonator = new Detonator(board.mines);

      detonator.start(detonate, (mine) => chainReaction(mine));

      return () => {
        detonator.stop();
      }
    }
  }, [detonate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (null);
}
