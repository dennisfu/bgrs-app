import React from 'react';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import {People} from './components/People';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      <People />
    </div>
  );
}

export default App;
