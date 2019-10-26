import React from 'react';
import './App.scss';
import Game from './components/Game';

window.oncontextmenu = function ()
{
  return false;
}

// @TODO Difficulty selector

function App() {
  return (
    <div className="App">
      <main>
        {/* Hard */}
        <Game width={50} height={30} density={250}/>
        {/* Easy */}
        {/* <Game width={10} height={10} density={10}/> */}
      </main>
    </div>
  );
}

export default App;
