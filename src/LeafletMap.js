import React, { Component, useEffect, useState, useContext } from 'react';
import { MapContainer, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countries from './data/countries.json';
import './LeafletMap.css'
import Distance from './Distance.js'
import chooseColor from './chooseColor.js'
import { MapContext } from './MapContext';


const LeafletMap = ({guess, selectedCountry, resetMap}) => {
  const [rerenderKey, setRerenderKey] = useState(0);
  const [guessedCountries, setGuessedCountries] = useState(new Map());
  const[smallestDistance, setSmallestDistance] = useState(Number.MAX_VALUE);
  const[smallestDistanceCountry, setSmallestDistanceCountry] = useState('');
  const { lowestDistance, setLowestDistance, nameOfClosestCountry, setNameOfClosestCountry } = useContext(MapContext);

  //when internal smallest distance is updated, update the universal one
  useEffect(() => {
    setLowestDistance(smallestDistance);
    setNameOfClosestCountry(smallestDistanceCountry);
  }, [smallestDistanceCountry]);

  //set base style of the map
  const countryStyle = {
    color: 'black',
    weight: 0.5,
  };

  //to color each country on the map appropriately according to game play
  const onEachCountry = (country, layer) => {
    //get name of country
    const name = country.properties.ADMIN;

      //if reset, rerender and clear the guessed countries, clear the map to white, reset closest country
      if (resetMap) {
        // Clear the map when resetMap is true
        setGuessedCountries(new Map());
        setSmallestDistance(Number.MAX_VALUE);
        setSmallestDistanceCountry("");
        setRerenderKey((prevKey) => prevKey + 1);
        layer.setStyle({fillColor: "white"})
      }

      //if winning country, color green
      else if((selectedCountry != null) && (name.toLowerCase() == guess.toLowerCase()) &&  (guess.toLowerCase() == selectedCountry.properties.ADMIN.toLowerCase())) {
        layer.setStyle({ fillColor: "green" , fillOpacity: 1});
        setGuessedCountries(new Map());
      }

      //if not winning country, color according to distance to the winning country
      else if((selectedCountry != null) && (name.toLowerCase() == guess.toLowerCase())) {

        //find distance using function from Distance.js
        let distance = Distance({guess, selectedCountry})

        //if the distance is less than any previously guessed countries, it needs to be displayed along with the country name
        if(distance < lowestDistance) {
          setSmallestDistance(distance);
          setSmallestDistanceCountry(guess);
        }
        //use color function from chooseColor.js to set style
        let color = chooseColor(distance)
        layer.setStyle({fillColor: color, fillOpacity: 1})

        //add country and color to map
        setGuessedCountries((prevGuessedCountries) => new Map(prevGuessedCountries.set(name, color)));
      }

      //color any previously guessed countries on rerender
      else if(guessedCountries.has(name)) {
        layer.setStyle({fillColor: guessedCountries.get(name), fillOpacity: 1})
      }

      //if not guessed, set to white
      else{
        layer.setStyle({fillColor: "white"})
      }
  }




  //rerender on guess change or new selected country change or reset
  useEffect(() => {
    setRerenderKey((prevKey) => prevKey + 1);
  }, [guess, selectedCountry, resetMap]);
  

    //display the leaflet map and corresponding style
    return( 
      <div>
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '60vh', width: '50vw'}}>
        <GeoJSON key ={rerenderKey} style ={{color: 'black', weight: 0.5}} data={countries.features} onEachFeature={onEachCountry}/>
        </MapContainer>
      </div>
    )


    }
export default LeafletMap;