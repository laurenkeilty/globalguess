import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import LeafletMap from './LeafletMap';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import countries from './data/countries.json';
import { MapContext } from './MapContext';


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
  const [firstGame, setFirstGame] = useState(true);


  const { lowestDistance, nameOfClosestCountry } = useContext(MapContext);



  
  //alert should be shown but only once
  useEffect(() => {
    if (alertMessage) {
      alert(alertMessage);
      setAlertMessage('');
    }
  }, [alertMessage]);


  //when handle new round is clicked call handle a new game and set start new round to false
  const handleNewRound = () => {
    setStartNewRound(false);
    handleNewGame();
  }




  //handle country input from user
  const handleSubmission = () => {

    //if user needs to start new round before inputting more countries, this is not executed
    if(startNewRound != true) {
      //turn reset game to false
      setResetGame(false);

      //determine if its a valid country and put into correct format if it's another name for that country
      
      //if its the correct guess
      if (selectedCountry && guess.toLowerCase() === selectedCountry.properties.ADMIN.toLowerCase()) {

        // The guess is correct, notify and reset
        setdelayedGuess(guess);
        setStartNewRound(true);
        updateLeaderboard(currentPlayer);
        alert('Correct guess!, You Win!');
        alert('Press "New Round" to play again');
      } 
      else {
        // The guess is incorrect, move to next player and notify
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



  //handle called when starting new round
  const handleNewGame = () => {
    //check that its not the first game if it is, prompt to press the start game button so a number of players can be entered
    if(firstGame == true) {
      setAlertMessage("Please press the start/reset game button to begin a game")
    }
    //else handle a new round
    else {
        // Randomly choose a country for the round
      const randomCountryIndex = Math.floor(Math.random() * countries.features.length);
      const randomCountry = countries.features[randomCountryIndex];

      // get the name of the country
      const countryName = randomCountry.properties.ADMIN;

      // Update the state with the selected country
      setSelectedCountry(randomCountry);

      //reset player to 1
      setCurrentPlayer(1);

      //display to user
      setAlertMessage(`New Game! \nCurrent Player: ${currentPlayer}.`);

      //reset country colors to white
      setResetGame(true);
    }
  };




  //When the reset/start game button is hit, this handler is called
  const handleResetGame = () => {
    //set first game to false to unlock the new round button
    setFirstGame(false);

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

    //notify user that the game has been reset
    setAlertMessage(`Game reset! \nNumber of players: ${players}.`);

    //reset country colors to white
    setResetGame(true);
  };




  //displaying the current tally for game to the leaderboard
  const updateLeaderboard = (winner) => {
    const updatedLeaderboard = leaderboard.map((entry) => ({ ...entry }));
    const index = updatedLeaderboard.findIndex((entry) => entry.player === winner);

    if (index !== -1) {
      // Increment the number of games won for the winner
      updatedLeaderboard[index].wins++;
    }

    // Sort the leaderboard by player number
    updatedLeaderboard.sort((a, b) => a.player - b.player);

    //set leaderboard state
    setLeaderboard(updatedLeaderboard);
  };






  //display elements
  //other controls also in App.css
  return (
    <div className="App">
      <header className="title">
      Global Guess (Multiplayer Version)
      </header>
      <section className="leaflet-container">
        <LeafletMap guess={delayedGuess} selectedCountry={selectedCountry} resetMap={resetGame}/>
      </section>
      <section className="results">
        <Text style = {{top: 40, left: -10, fontSize: 30, color: 'white', fontFamily:"Comic Sans MS"}}>The current closest country is {nameOfClosestCountry}</Text>
        <Text style = {{top: 60, left: -10, fontSize: 25, color: 'white', fontFamily:"Comic Sans MS", display: 'inline-block'}}>which is {Math.ceil(lowestDistance)} km from the chosen country</Text>
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
      <Text style ={{top: 10, left: 55, fontSize: 25, color: 'white', fontFamily:"Comic Sans MS"}}>Who's Turn?</Text>
      <Text style ={{top: 90, left: -75, fontSize: 35, color: 'white', fontFamily:"Comic Sans MS"}}>Player {currentPlayer}</Text>
      </section>
      <section className="restart-game-button">
        <button onClick={handleNewRound} style={{
          padding: 20,
          fontSize: 20,
          marginTop: '6vh',
          backgroundColor: 'white',
          borderColor: 'white',
          borderWidth: 7,
          borderRadius: 8,
          width: '80wh',
          color: 'black',
          fontFamily:"Comic Sans MS",
        }}>Play Another Round</button>
        <button onClick={handleResetGame} style={{
          paddingLeft: 25,
          paddingRight: 25,
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 20,
          marginTop: '4vh',
          backgroundColor: 'white',
          borderColor: 'white',
          borderWidth: 7,
          borderRadius: 8,
          width: '100wh',
          color: 'black', 
          fontFamily:"Comic Sans MS"
        }}>Start/Reset Game</button>
      </section>
      <section className="leaderboard">
      <Text style={{top: 20, fontSize: 25, color: 'white', textAlign: 'center', fontFamily:"Comic Sans MS"}}>Leaderboard</Text>
        <table className= "leaderboardTable">
          <thead>
            <tr style ={{border: 'solid'}}>
              <th style ={{border: 'solid'}}>Player</th>
              <th style ={{border: 'solid'}}>Wins</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index}>
                <td style ={{border: 'solid'}}>Player {entry.player}</td>
                <td style ={{border: 'solid'}}>{entry.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
