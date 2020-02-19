import React from 'react';
import logo from './logo.svg';
import './App.css';
import AllRestaurants from './components/AllRestaurants'

function App() {
    require('dotenv').config()
  return (
    <AllRestaurants />
  );
}

export default App;
