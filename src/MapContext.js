import React, { createContext, useState } from 'react';

export const MapContext = createContext();

//for moving data about closest country and distance from leaflet.js to app.js
export const MapProvider = ({ children }) => {
  const [lowestDistance, setLowestDistance] = useState(100000);
  const [nameOfClosestCountry, setNameOfClosestCountry] = useState('');

  return (
    <MapContext.Provider value={{ lowestDistance, setLowestDistance, nameOfClosestCountry, setNameOfClosestCountry }}>
      {children}
    </MapContext.Provider>
  );
};