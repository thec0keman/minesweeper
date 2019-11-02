import React from 'react';
import './App.scss';
import Game from './containers/game';

window.oncontextmenu = function ()
{
  return false;
}

function App() {
  return (
    <main className='app'>
      <Game/>
    </main>
  );
}

export default App;
