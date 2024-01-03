import React from 'react';
import countries from './data/countries.json';

//Returns the distance in km between the two countries calculated via the 
//haversine formula using the coordinates given in countries.json
export default function Distance({guess, selectedCountry}) {
    console.log("the guess", guess.toLowerCase());
    console.log('the selected', selectedCountry);

    //convert countries to an array of values so find can be used
    const countriesArray = countries.features;
    console.log("The countries array", countriesArray);

    //get list of guess country coordinates
    const guessFeature = countriesArray.find(country => country.properties.ADMIN.toLowerCase() == guess.toLowerCase());
    console.log("The guess feature", guessFeature);
    const guessPolygons = guessFeature ? guessFeature.geometry.coordinates : null;
    console.log("The guess polygon", guessPolygons);

    //get list of selected country coordinates
    const selectedPolygons = selectedCountry ? selectedCountry.geometry.coordinates : null;

    //use to calculate haversine distance
    const calculateHaversineDistance = (latitude1, longitude1, latitude2, longitude2) => {
        const eRadius = 6371; // Earth radius in kilometers
        const dLatitude = (latitude2 - latitude1) * (Math.PI / 180);
        const dLongitude = (longitude2 - longitude1) * (Math.PI / 180);
        const a =
          Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
          Math.cos(latitude1 * (Math.PI / 180)) *
            Math.cos(latitude2 * (Math.PI / 180)) *
            Math.sin(dLongitude / 2) *
            Math.sin(dLongitude / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = eRadius * c;
        return distance;
      };

      let minDistance = Number.MAX_VALUE;

        // Iterate through list of all coordinates finding the smallest possible haversine km distance between the countries borders
        guessPolygons.forEach(guessPolygon => {
            selectedPolygons.forEach(selectedPolygon => {
                guessPolygon.forEach(guessRing => {
                    selectedPolygon.forEach(selectedPolygonRing => {
                        selectedPolygonRing.forEach(selectedCoords => {
                            guessRing.forEach(guessCoords => {
                                if (Array.isArray(selectedCoords)) {
                                    selectedCoords.forEach(selectedCoord => {
                                        const distance = calculateHaversineDistance(
                                            guessCoords[1],
                                            guessCoords[0],
                                            selectedCoord[1],
                                            selectedCoord[0]
                                        );
                                        minDistance = Math.min(minDistance, distance);
                                    });
                                } else {
                                    const distance = calculateHaversineDistance(
                                        guessCoords[1],
                                        guessCoords[0],
                                        selectedCoords[1],
                                        selectedCoords[0]
                                    );
                                    minDistance = Math.min(minDistance, distance);
                                }
                            });
                        });
                    });
                });
            });
        });

    //return the minimum distance
    return minDistance;
}