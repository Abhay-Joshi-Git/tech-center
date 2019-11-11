import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import './App.scss';
import Login from './Components/Login';

function App() {
  return (
    <div className="App container-fluid">
      <header className="App-header">
        <Login></Login>
      </header>
    </div>
  );
}

export default App;
