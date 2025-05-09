import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? <Marker position={position} icon={L.icon({ iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", iconSize: [25, 41], iconAnchor: [12, 41] })} /> : null;
};

const RecenterMap = ({ position }) => {
  const map = useMapEvents({});
  useEffect(() => {
    if (position) {
      map.setView(position, 10);
    }
  }, [position]);
  return null;
};

const IndiaMap = ({ position, setPosition }) => {
  return (
    <MapContainer
      center={position || [22.9734, 78.6569]}
      zoom={4}
      style={{ height: "60vh", width: "80%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <LocationMarker position={position} setPosition={setPosition} />
      <RecenterMap position={position} />
    </MapContainer>
  );
};

export default IndiaMap;
