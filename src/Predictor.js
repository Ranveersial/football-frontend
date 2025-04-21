import React, { useState } from 'react';
import './App.css';

const teams = [
  'Arsenal', 'Aston Villa', 'Bournemouth', 'Brentford', 'Brighton', 'Chelsea',
  'Crystal Palace', 'Everton', 'Fulham', 'Ipswich', 'Leicester', 'Liverpool',
  'Man City', 'Man United', 'Newcastle', "Nott'm Forest", 'Tottenham',
  'West Ham', 'Wolves'
];

const playerImages = {
  'Arsenal': '/players/saka.png',
  'Aston Villa': '/players/watkins.png',
  'Bournemouth': '/players/kluivert.png',
  'Brentford': '/players/mbeumo.png',
  'Brighton': '/players/minteh.png',
  'Chelsea': '/players/palmer.png',
  'Crystal Palace': '/players/mateta.png',
  'Everton': '/players/tarkowski.png',
  'Fulham': '/players/iwobi.png',
  'Liverpool': '/players/salah.png',
  'Man City': '/players/haaland.png',
  'Man United': '/players/bruno.png',
  'Newcastle': '/players/isak.png',
  "Nott'm Forest": '/players/wood.png',
  'Tottenham': '/players/maddison.png',
  'West Ham': '/players/bowen.png',
  'Wolves': '/players/cunha.png',
  'Leicester': '/players/vardy.png',
  'Ipswich': '/players/delap.png', // placeholder
};

function Predictor() {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [prediction, setPrediction] = useState(null);

  // 🔁 Warm up the backend on first visit
  useEffect(() => {
    fetch('https://football-backend-r0kg.onrender.com/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ home_team: 'Arsenal', away_team: 'Chelsea' })
    })
      .then(() => console.log('⚡ Backend wake-up ping sent'))
      .catch(err => console.log('Backend wake-up failed (cold start):', err));
  }, []);
  
  const handlePredict = async () => {
    try {
      const response = await fetch('https://football-backend-r0kg.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ home_team: homeTeam, away_team: awayTeam })
      });
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      alert("Prediction failed. Try again later.");
    }
  };

  return (
    <div className="predictor-container">
      <h1>Premier League Match Predictor</h1>
      <div className="content">
        <div className="team-side">
          {homeTeam && <img src={playerImages[homeTeam]} alt={homeTeam} className="player-img" />}
        </div>

        <div className="predictor-core">
          <select value={homeTeam} onChange={e => setHomeTeam(e.target.value)}>
            <option>Select Home Team</option>
            {teams.map(team => <option key={team}>{team}</option>)}
          </select>
          <br />
          <select value={awayTeam} onChange={e => setAwayTeam(e.target.value)}>
            <option>Select Away Team</option>
            {teams.map(team => <option key={team}>{team}</option>)}
          </select>
          <br />
          <button onClick={handlePredict} disabled={!homeTeam || !awayTeam}>Predict</button>

          {prediction && (
            <div className="results">
              <p>✅ Over 1.5 Goals: {(prediction.over_15 * 100).toFixed(0)}%</p>
              <p>⚽ Over 2.5 Goals: {(prediction.over_25 * 100).toFixed(0)}%</p>
              <p>🤝 BTTS (Yes): {(prediction.btts * 100).toFixed(0)}%</p>
              <p>🏠 {homeTeam} Win: {(prediction.away_win * 100).toFixed(0)}%</p>
              <p>🤝 Draw: {(prediction.draw * 100).toFixed(0)}%</p>
              <p>🛫 {awayTeam} Win: {(prediction.home_win * 100).toFixed(0)}%</p>
              <p>📐 Predicted Corners: {prediction.corners.toFixed(2)}</p>
            </div>
          )}
        </div>

        <div className="team-side right player">
          {awayTeam && <img src={playerImages[awayTeam]} alt={awayTeam} className="player-img" />}
        </div>
      </div>
    </div>
  );
}

export default Predictor;
