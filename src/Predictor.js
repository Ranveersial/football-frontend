import React, { useState } from 'react';

const teams = [
  'Arsenal', 'Aston Villa', 'Bournemouth', 'Brentford', 'Brighton', 'Chelsea',
  'Crystal Palace', 'Everton', 'Fulham', 'Ipswich', 'Leicester', 'Liverpool',
  'Man City', 'Man United', 'Newcastle', "Nott'm Forest", 'Tottenham',
  'West Ham', 'Wolves'
];

function Predictor() {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await fetch('https://football-backend-r0kg.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ home_team: homeTeam, away_team: awayTeam }),
      });

      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error("Prediction fetch failed:", error);
      alert("Failed to fetch prediction. Try again later.");
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', textAlign: 'center' }}>
      <select value={homeTeam} onChange={e => setHomeTeam(e.target.value)}>
        <option>Select Home Team</option>
        {teams.map(team => <option key={team}>{team}</option>)}
      </select>
      <br /><br />
      <select value={awayTeam} onChange={e => setAwayTeam(e.target.value)}>
        <option>Select Away Team</option>
        {teams.map(team => <option key={team}>{team}</option>)}
      </select>
      <br /><br />
      <button onClick={handlePredict} disabled={!homeTeam || !awayTeam}>Predict</button>

      {prediction && (
        <div style={{ marginTop: '30px' }}>
          <h3>Prediction:</h3>
          <p>✅ Over 1.5 Goals: {Math.round(prediction.over_15 * 100)}%</p>
          <p>⚽ Over 2.5 Goals: {Math.round(prediction.over_25 * 100)}%</p>
          <p>🤝 BTTS (Yes): {Math.round(prediction.btts * 100)}%</p>
          <p>🏠 Home Win: {Math.round(prediction.away_win * 100)}%</p>
          <p>🤝 Draw: {Math.round(prediction.draw * 100)}%</p>
          <p>🛫 Away Win: {Math.round(prediction.home_win * 100)}%</p>
          <p>📐 Predicted Corners: {prediction.corners.toFixed(1)}</p>
        </div>
      )}
    </div>
  );
}

export default Predictor;
