import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countries from './data/countries.json';


const LeafletMap = () => {
  const position = [51.505, -0.09]; // Initial map center coordinates

  return (
    <MapContainer center={position} zoom={2} style={{ height: '60vh', width: '50vw'}}>
        <GeoJSON data={countries} />
    </MapContainer>
  );
};

export default LeafletMap;