import './App.css';
import React, { useState, useEffect } from 'react';
import LeafletMap from './LeafletMap';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import countries from './data/countries.json';

function App() {
  const [guess, setGuess] = useState('');
  const [delayedGuess, setdelayedGuess] = useState('');
  const [guessColor, setGuessColor] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [numberOfPlayers, setNumberOfPlayers] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [resetGame, setResetGame] = useState(false);
  const [startNewRound, setStartNewRound] = useState(false);



  
  //alert should be shown but only once
  useEffect(() => {
    if (alertMessage) {
      alert(alertMessage);
      setAlertMessage('');
    }
  }, [alertMessage]);



  const handleNewRound = () => {
    setStartNewRound(false);
    handleNewGame();

  }




  const handleSubmission = () => {
    if(startNewRound != true) {
      //turn reset game to false
      setResetGame(false);

      //determine if its a valid country and put into correct format if it's another name for that country
      

      if (selectedCountry && guess.toLowerCase() === selectedCountry.properties.ADMIN.toLowerCase()) {

        // The guess is correct, you can handle this case accordingly
        setdelayedGuess(guess);
        setStartNewRound(true);
        updateLeaderboard(currentPlayer);
        alert('Correct guess!, You Win!');
        alert('Press "New Round" to play again');
      } 
      else {
        // The guess is incorrect, handle this case accordingly
        alert('Incorrect guess!');
        setdelayedGuess(guess);
        if(currentPlayer < numberOfPlayers) {
          setCurrentPlayer(currentPlayer + 1);
        }
        else {
          setCurrentPlayer(1);
        }
      }
    }
    // Clear the content of the TextInput
    setGuess('');
  };




  const handleNewGame = () => {
    // Randomly choose a country for the round
    const randomCountryIndex = Math.floor(Math.random() * countries.features.length);
    const randomCountry = countries.features[randomCountryIndex];

    // get the name of the country
    const countryName = randomCountry.properties.ADMIN;

    // Update the state with the selected country
    setSelectedCountry(randomCountry);

    setCurrentPlayer(1);

    // debugging 
    setAlertMessage(`New Game! \nSelected country: ${countryName} \nCurrent Player: ${currentPlayer}.`);

    //reset country colors to white
    setResetGame(true);
  };




  //When the reset/start game button is hit, this handler is called
  const handleResetGame = () => {

    //User inputs a number of players between 1-6, if the inputted number is non-valid, the user is prompted again
    let players;
    do {
      players = window.prompt('Enter the number of players (1-6):');
    } while (players !== null && (isNaN(players) || players < 1 || players > 6));

    //update the state wiht the the current number of players
    setNumberOfPlayers(parseInt(players, 10));
  
    // Randomly choose a country for the round
    const randomCountryIndex = Math.floor(Math.random() * countries.features.length);
    const randomCountry = countries.features[randomCountryIndex];

    // get the name of the country
    const countryName = randomCountry.properties.ADMIN;

    // Update the state with the selected country
    setSelectedCountry(randomCountry);

    //update the state of which players turn it is, generate leaderboard for current game
    setCurrentPlayer(1);
    setLeaderboard(Array.from({ length: players }, (_, index) => ({ player: index + 1, wins: 0 })));

    //notify user that the game has been reset (REMOVE COUNTRY AFTER DEBUGGING)
    setAlertMessage(`Game reset! \nNumber of players: ${players}. \nSelected country: ${countryName}`);
  };





  const updateLeaderboard = (winner) => {
    const updatedLeaderboard = leaderboard.map((entry) => ({ ...entry }));
    const index = updatedLeaderboard.findIndex((entry) => entry.player === winner);

    if (index !== -1) {
      // Increment the number of games won for the winner
      updatedLeaderboard[index].wins++;
    }

    // Sort the leaderboard by player number
    updatedLeaderboard.sort((a, b) => a.player - b.player);

    setLeaderboard(updatedLeaderboard);
  };







  return (
    <div className="App">
      <header className="title">
      Global Guess (Multiplayer Version)
      </header>
      <section className="leaflet-container">
        <LeafletMap guess={delayedGuess} selectedCountry={selectedCountry} resetMap={resetGame}/>
      </section>
      <section className="results">
        current closest result
      </section>
      <footer className="footer">
        produced by lauren keilty
      </footer>
      <section className="interactive">
        <TextInput
        placeholder="Guess Here..."
        onSubmitEditing={handleSubmission}
          value={guess}
          onChangeText={(text) => setGuess(text)}
        style={{
          padding: 20,
          fontSize: 20,
          marginTop: '5vh',
          backgroundColor: 'white',
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 4,
          width: '35vw'
        }}
        />
      </section>
      <section className="current-turn-button">
      <Text style ={{top: 15, left: 40, fontSize: 25, color: 'white'}}>Who's Turn?</Text>
      <Text style ={{top: 90, left: -60, fontSize: 25, color: 'white'}}>Player {currentPlayer}</Text>
      </section>
      <section className="restart-game-button">
        {/* Button to reset the game */}
        <button onClick={handleNewRound} style={{
          padding: 20,
          fontSize: 20,
          marginTop: '6vh',
          backgroundColor: 'white',
          borderColor: 'white',
          borderWidth: 4,
          borderRadius: 8,
          width: '80wh',
          color: '#396cca'
        }}>Play Another Round</button>
        <button onClick={handleResetGame} style={{
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 20,
          marginTop: '4vh',
          backgroundColor: 'white',
          borderColor: 'white',
          borderWidth: 4,
          borderRadius: 8,
          width: '100wh',
          color: '#396cca'
        }}>Start/Reset Game</button>
      </section>
      <section className="leaderboard">
        Leaderboard
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index}>
                <td className="table-cell">Player {entry.player}</td>
                <td className="table-cell">{entry.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
