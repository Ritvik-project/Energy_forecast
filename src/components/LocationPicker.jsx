import React, { useState, useEffect } from 'react';
import IndiaMap from './IndiaMap'; // your provided map
// import './LocationPicker.css';

const LocationPicker = ({ initialValues = {}, onSave, onClose }) => {
  // const [position, setPosition] = useState(
  //   initialValues.lat && initialValues.lon
  //     ? [parseFloat(initialValues.lat), parseFloat(initialValues.lon)]
  //     : null
  // );
  // const [latitude, setLatitude] = useState(initialValues.lat || '');
  // const [longitude, setLongitude] = useState(initialValues.lon || '');
  // const [location, setLocation] = useState(initialValues.name || '');

  // // Update lat/lon fields when map is clicked
  // useEffect(() => {
  //   if (position) {
  //     const [lat, lon] = position;
  //     setLatitude(lat.toFixed(6));
  //     setLongitude(lon.toFixed(6));

  //     // Reverse geocode to get location name
  //     fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
  //       .then(res => res.json())
  //       .then(data => {
  //         const name =
  //           data?.address?.city ||
  //           data?.address?.town ||
  //           data?.address?.village ||
  //           data?.address?.county ||
  //           data?.address?.state ||
  //           'Unknown';
  //         setLocation(name);
  //       })
  //       .catch(console.error);
  //   }
  // }, [position]);

  // // Geocode when user types a location name
  // useEffect(() => {
  //   const delay = setTimeout(() => {
  //     if (location) {
  //       fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
  //         .then(res => res.json())
  //         .then(results => {
  //           if (results.length > 0) {
  //             const lat = parseFloat(results[0].lat);
  //             const lon = parseFloat(results[0].lon);
  //             setLatitude(lat.toFixed(6));
  //             setLongitude(lon.toFixed(6));
  //             setPosition([lat, lon]);
  //           }
  //         })
  //         .catch(console.error);
  //     }
  //   }, 1000);
  //   return () => clearTimeout(delay);
  // }, [location]);

  // // Update map when lat/lon fields change
  // useEffect(() => {
  //   if (!isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude))) {
  //     const lat = parseFloat(latitude);
  //     const lon = parseFloat(longitude);
  //     setPosition([lat, lon]);
  //   }
  // }, [latitude, longitude]);

  // const handleSave = () => {
  //   if (latitude && longitude && location) {
  //     onSave({ lat: latitude, lon: longitude, name: location });
  //   } else {
  //     alert("Please provide a valid location.");
  //   }
  // };

  // return (
  //   <div className="picker-modal">
  //     <h3>Select Location</h3>

  //     <div className="input-group">
  //       <label>Latitude:</label>
  //       <input
  //         type="number"
  //         step="any"
  //         value={latitude}
  //         onChange={(e) => setLatitude(e.target.value)}
  //       />
  //     </div>

  //     <div className="input-group">
  //       <label>Longitude:</label>
  //       <input
  //         type="number"
  //         step="any"
  //         value={longitude}
  //         onChange={(e) => setLongitude(e.target.value)}
  //       />
  //     </div>

  //     <div className="input-group">
  //       <label>Location Name:</label>
  //       <input
  //         type="text"
  //         value={location}
  //         onChange={(e) => setLocation(e.target.value)}
  //       />
  //     </div>

  //     <IndiaMap position={position} setPosition={setPosition} />

  //     <div className="btn-group">
  //       <button onClick={handleSave}>Save</button>
  //       <button onClick={onClose}>Cancel</button>
  //     </div>
  //   </div>
  // );
  // const [postion]
};

export default LocationPicker;
