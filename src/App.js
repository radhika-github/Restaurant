import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllRestaurants from './components/AllRestaurants';
import NavBar from './components/NavBar/NavBar';
import Video from './components/Video/Video';

function App() {
    require('dotenv').config()
  return (
      <div>
          {/*<Video />*/}

          <AllRestaurants/>
      </div>

  );
}

export default App;
