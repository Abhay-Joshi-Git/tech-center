import React from 'react';

import logo from './logo.svg';
import './App.scss';
import store from './redux/reducers';
import { connect } from 'react-redux';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login></Login>
      </header>
    </div>
  );
}

export default App;
