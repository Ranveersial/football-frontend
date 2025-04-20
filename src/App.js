import React from 'react';
import Predictor from './Predictor';
import './App.css';
import bg from './assets/premierleaguebg.jpg'; // Make sure this is the correct path

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
        ⚽ Premier League Match Predictor
      </h1>
      <Predictor />
    </div>
  );
}

export default App;
