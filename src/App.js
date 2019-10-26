import React, { useState } from 'react';
import './App.scss';
import Game from './components/Game';
import Difficulty from './components/Difficulty';
import { difficulties } from './lib/difficulties';

window.oncontextmenu = function ()
{
  return false;
}

function App() {
  const [difficulty, setDifficulty] = useState();

  if (difficulty) {
    return (
      <main className='app'>
        <button onClick={() => setDifficulty() }>Change Difficulty</button>
        <Game {...difficulties[difficulty]} />
      </main>
    );
  } else {
    return (
      <Difficulty setDifficulty={setDifficulty} difficulty={difficulty}/>
    )
  }
}

export default App;
