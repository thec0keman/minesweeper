import React from 'react';
import './App.scss';
import Game from './containers/game';
import Difficulty from './containers/difficulty';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <main className='app'>
      <Router>
        <Switch>
          <Route path='/:difficulty' component={Game}/>
          <Route path='/' component={Difficulty}/>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
