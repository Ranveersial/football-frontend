import React, { useState } from 'react';

const teams = [
  'Arsenal', 'Aston Villa', 'Bournemouth', 'Brentford', 'Brighton', 'Burnley', 'Chelsea',
  'Crystal Palace', 'Everton', 'Fulham', 'Liverpool', 'Luton', 'Man City', 'Man United',
  'Newcastle', "Nott'm Forest", 'Sheffield United', 'Tottenham', 'West Ham', 'Wolves'
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
          <p>✅ Over 1.5 Goals: {prediction.over_15}</p>
          <p>⚽ Over 2.5 Goals: {prediction.over_25}</p>
          <p>🤝 BTTS (Yes): {prediction.btts}</p>
          <p>🏠 Home Win: {prediction.home_win}</p>
          <p>🤝 Draw: {prediction.draw}</p>
          <p>🛫 Away Win: {prediction.away_win}</p>
          <p>📐 Predicted Corners: {prediction.corners}</p>
        </div>
      )}
    </div>
  );
}

export default Predictor;

