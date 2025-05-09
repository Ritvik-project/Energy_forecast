import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useSelector } from 'react-redux';

const Windgraph = () => {
  const [index, setIndex] = useState(0);
  const [dataw, setDataw] = useState({
    windpower: [],
    time: [],
  });

  const coordinates = useSelector((state) => state.energy.coordinates);

  const handleButtonClick = (dayIndex) => {
    setIndex(dayIndex * 24);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.188.29:5001/predict?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`);
        const data = await response.json();
        if (data && data.hourly) {
          setDataw({
            time: data.hourly.formatted_time || [],
            windpower: data.hourly.wind_energy || [],
          });
        }
      } catch (error) {
        console.error('Error fetching wind data:', error);
      }
    };

    fetchData();
  }, [coordinates]);

  const hours = (dataw.time || []).slice(index, index + 24).map((timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    return hours < 10 ? '0' + hours : '' + hours;
  });

  const windP = (dataw.windpower || []).slice(index, index + 24).map((val) => val / 1000);

  return (
    <>
      <div style={{ marginTop: '30px' }}>
        <h1 className='Gh'>Wind power generation</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <LineChart
          xAxis={[{ data: hours, label: 'Time (in hours)' }]}
          yAxis={[{ label: 'Power (kW)' }]}
          series={[{ data: windP, label: 'Wind power (kW)' }]}
          width={800}
          height={250}
        />
        <div style={{ marginTop: '80px', backgroundColor: 'black', maxHeight: '45px', color: 'white', padding: '10px', borderRadius: '20px' }}>
          Selected Day {index / 24 + 1}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {Array.from({ length: 14 }, (_, i) => (
          <button
            key={i}
            onClick={() => handleButtonClick(i)}
            style={{
              padding: '10px',
              fontSize: '16px',
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '10px',
            }}
          >
            Day {i + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Windgraph;
