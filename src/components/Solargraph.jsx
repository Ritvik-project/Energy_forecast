import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEnergyData } from './features/energySlice'; // adjust path accordingly

const SolarGraph = () => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();

  const {
    solarEnergy,
    formattedTime,
    latitude,
    longitude,
    status,
  } = useSelector((state) => state.energy);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEnergyData({ latitude, longitude }));
    }
  }, [dispatch, latitude, longitude, status]);

  const handleButtonClick = (dayIndex) => {
    setIndex(dayIndex * 24);
  };

  const hours = formattedTime.slice(index, index + 24).map((timestamp) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    return hour < 10 ? '0' + hour : '' + hour;
  });

  const solarP = solarEnergy.slice(index, index + 24).map((val) => val / 20000);
  console.log(hours,solarP)

  return (
    <>
      <div style={{ marginTop: '30px' }}>
        <h1 className='Gh'>Solar Power Generation</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <LineChart
          xAxis={[{ data: hours, label: 'Time (in hours)' }]}
          yAxis={[{ label: 'Power (kW)' }]}
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
