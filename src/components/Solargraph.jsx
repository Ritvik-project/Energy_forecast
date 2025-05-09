import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useSelector } from 'react-redux';

const SolarGraph = () => {
  const [index, setIndex] = useState(0);
  const [datas, setDatas] = useState({
    time: [],
    solar: [],
  });

  const coordinates = useSelector((state) => state.energy.coordinates);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://192.168.188.29:5001/predict?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`);
        const data = await res.json();
        if (data && data.hourly) {
          setDatas({
            time: data.hourly.formatted_time || [],
            solar: data.hourly.solar_energy || [],
          });
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchData();
  }, [coordinates]);

  const handleButtonClick = (dayIndex) => {
    setIndex(dayIndex * 24);
  };

  const hours = (datas.time || []).slice(index, index + 24).map((timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    return hours < 10 ? '0' + hours : '' + hours;
  });

  const solarP = (datas.solar || []).slice(index, index + 24).map((val) => val / 1000);

  return (
    <>
      <div style={{ marginTop: '30px' }}>
        <h1 className='Gh'>Solar power generation</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <LineChart
          xAxis={[{ data: hours, label: 'Time (in hours)' }]}
          yAxis={[{ label: 'Power' }]}
          series={[{ data: solarP, label: 'Solar energy (kW)' }]}
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

export default SolarGraph;
