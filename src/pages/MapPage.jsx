import React, { useState, useEffect } from 'react';
import IndiaMap from '../components/IndiaMap';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCoordinates } from '../components/features/energySlice';

const MapPage = () => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [location, setLocation] = useState('');
  const [position, setPosition] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAddress = async (lat, lng) => {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
    const data = await res.json();
    setLocation(data.display_name || '');
  };

  const fetchLatLng = async (location) => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
    const data = await res.json();
    if (data[0]) {
      const newLat = parseFloat(data[0].lat);
      const newLng = parseFloat(data[0].lon);
      setLat(newLat);
      setLng(newLng);
      setPosition({ lat: newLat, lng: newLng });
    }
  };

  const click = () => {
    if (position) {
      dispatch(setCoordinates({ latitude: position.lat, longitude: position.lng }));
      navigate('/dashboard');
    }
  };

  const clickCompare = () => {
    navigate('/compare');
  };

  useEffect(() => {
    if (lat && lng) {
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);
      if (!isNaN(latNum) && !isNaN(lngNum)) {
        setPosition({ lat: latNum, lng: lngNum });
        fetchAddress(latNum, lngNum);
      }
    }
  }, [lat, lng]);

  useEffect(() => {
    if (position) {
      setLat(position.lat.toFixed(5));
      setLng(position.lng.toFixed(5));
      fetchAddress(position.lat, position.lng);
    }
  }, [position]);

  return (
    <div style={{ backgroundColor: 'black', height: '100%', color: 'white' }}>
      <div style={{display:'flex',justifyContent:'center',fontFamily:'calibri',fontSize:'40px'}}>
        <div>Energy Meter</div>    
      </div>
      <div style={{ display: 'flex', height: '80px', marginBottom: '4px', alignItems: 'center', justifyContent: 'center' }}>
        <input
          type="text"
          value={location}
          placeholder='Location:    Ex- Delhi'
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              fetchLatLng(location);
            }
          }}
          style={{
            height: '50%',
            width: '60%',
            textAlign: 'center',
            fontSize: '20px',
            borderRadius: '10px',
            marginTop: '10px',
            backgroundColor: 'white',
            color: 'grey'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', padding: '10px', height: '20%', justifyContent: 'center', alignItems: 'center', fontSize:'15px' }}>
        <label for='latitude' style={{fontSize:'25px'}}>Latitude:</label>
        <input type="text" id='latitude' value={lat} onChange={(e) => setLat(e.target.value)} style={{ backgroundColor: 'white', color:'grey',marginRight:'40px' }} />
        <label for='longitude' style={{fontSize:'25px'}}>Longitude:</label>
        <input type="text" id='longitude' value={lng} onChange={(e) => setLng(e.target.value)} style={{ backgroundColor: 'white',color:'grey' }} />
      </div>

      <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '80%', height: '90%', border: 'solid-black', borderRadius: '10px', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IndiaMap position={position} setPosition={setPosition} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', height: '60px' }}>
        <div style={{ marginTop: '10px' }}>
          <Button onClick={click} style={{ backgroundColor: 'peachpuff', width:'200px',borderRadius:'40px' }}>
            Go!
          </Button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ color: 'white', display: 'flex', justifyContent: 'center' }}>Compare Multiple Locations?</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
          <Button onClick={clickCompare}>Compare</Button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
