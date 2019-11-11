import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import './App.scss';
import Login from './components/Login';
import Welcome from './pages/Welcome';
import NotFound from './components/Notfound';

function App() {
  return (
    <div className="App container home">
      {/* // HEADER WILL GO HERE */}
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
