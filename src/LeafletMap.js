import React, { Component, useEffect, useState } from 'react';
import { MapContainer, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countries from './data/countries.json';
import './LeafletMap.css'
import Distance from './Distance.js'
import chooseColor from './chooseColor.js'


const LeafletMap = ({guess, selectedCountry, resetMap}) => {
  const [rerenderKey, setRerenderKey] = useState(0);
  const [guessedCountries, setGuessedCountries] = useState(new Map());

  
  const countryStyle = {
    color: 'black',
    weight: 0.5,
  };

  const onEachCountry = (country, layer) => {
    const name = country.properties.ADMIN;

      if (resetMap) {
        // Clear the map when resetMap is true
        setGuessedCountries(new Map());
        setRerenderKey((prevKey) => prevKey + 1);
        layer.setStyle({fillColor: "white"})
      }

      else if((selectedCountry != null) && (name.toLowerCase() == guess.toLowerCase()) &&  (guess.toLowerCase() == selectedCountry.properties.ADMIN.toLowerCase())) {
        layer.setStyle({ fillColor: "green" });
        setGuessedCountries(new Map());
      }

      else if((selectedCountry != null) && (name.toLowerCase() == guess.toLowerCase())) {
        console.log('we are at the guess country in the list')
        let distance = Distance({guess, selectedCountry})
        console.log(distance)
        let color = chooseColor(distance)
        layer.setStyle({fillColor: color})
        setGuessedCountries((prevGuessedCountries) => new Map(prevGuessedCountries.set(name, color)));
        console.log(guessedCountries);
      }

      else if(guessedCountries.has(name)) {
        layer.setStyle({fillColor: guessedCountries.get(name)})
      }

      else{
        layer.setStyle({fillColor: "white"})
      }
  }





  useEffect(() => {
    console.log("Rerender key:", rerenderKey);
    // Use rerenderKey as the key for GeoJSON to trigger re-render
    setRerenderKey((prevKey) => prevKey + 1);
  }, [guess, selectedCountry, resetMap]);
  
    return( 
      <div>
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '60vh', width: '50vw'}}>
        <GeoJSON key ={rerenderKey} style ={{color: 'black', weight: 0.5}} data={countries.features} onEachFeature={onEachCountry}/>
        </MapContainer>
      </div>
    )


    }
export default LeafletMap;