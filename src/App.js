import logo from './logo.svg';
import './App.css';
import React from 'react';
import LeafletMap from './LeafletMap';

function App() {
  return (
    <div className="App">
      <header className="title">
      Global Guess
      </header>
      <section className="leaflet-container">
        <LeafletMap />
      </section>
      <section className="results">
        current closest result
      </section>
      <footer className="footer">
        produced by lauren keilty
      </footer>
      <section className="interactive">
        guess here
      </section>
      <section className="current-turn-button">
        displays current player
      </section>
      <section className="restart-game-button">
        reset game button
      </section>
      <section className="leaderboard">
        leaderboard
      </section>
    </div>
  );
}

export default App;
