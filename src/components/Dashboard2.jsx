import React, { useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineSolarPower } from "react-icons/md";
import { TbWindmill } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnergyData } from './features/energySlice'; // Adjust path as needed

const Dashboard2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    solarEnergy = [],
    windEnergy = [],
    formattedTime = [],
    latitude,
    longitude,
    status
  } = useSelector((state) => state.energy);

  // Fetch data on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEnergyData({ latitude, longitude }));
    }
  }, [dispatch, latitude, longitude, status]);

  const hours = formattedTime.slice(6, 18).map((timestamp) => {
    const date = new Date(timestamp);
    return date.getHours().toString().padStart(2, '0');
  });
// console.log("solarEnergy:",solarEnergy)
  const solarP = solarEnergy.slice(6, 18).map((val) => val / 20000);
  const windP = windEnergy.slice(6, 18).map((val) => val / 1000);

  const maxs = solarP.length ? Math.max(...solarP).toFixed(2) : 'N/A';
  // const mins = solarP.length ? Math.min(...solarP).toFixed(2) : 'N/A';
  const maxw = windP.length ? Math.max(...windP).toFixed(2) : 'N/A';
  // const minw = windP.length ? Math.min(...windP).toFixed(2) : 'N/A';
  const filteredSolarP = solarP.filter((val) => val > 0);
  const filteredWindP = windP.filter((val) => val > 0);

const mins = filteredSolarP.length ? Math.min(...filteredSolarP).toFixed(2) : 'N/A';
const minw = filteredWindP.length ? Math.min(...filteredWindP).toFixed(2) : 'N/A';


  const clicksolar = () => navigate('/solaroutput');
  const clickwind = () => navigate('/windoutput');

  return (
    <>
      <div className='second_dash'>
        <div className='first_2' onClick={clicksolar}>
          <div style={{ marginTop: '-60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>
            <h3>Solar Panel</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
            <MdOutlineSolarPower size={60} />
          </div>

          <div style={{ margin: '20px 0px 8px 0px', display:'flex',justifyContent:'center',fontSize:'20px' }}>Power Generation</div>
          <div style={{margin: '0px 0px 8px 10px'}}>Current: {solarP[0]?.toFixed(2)} kW</div>
          <div style={{ margin: '0px 0px 8px 10px' }}>Max: {maxs} kW</div>
          <div style={{ margin: '0px 0px 0px 10px' }}>Low: {mins} kW</div>
        </div>

        <div className='second_2'>
          <Link to='./forteen_days'>
            <div>
              <LineChart
                xAxis={[{ data: hours, label: 'Time (in hours)' }]}
                yAxis={[{ label: 'Power Generation (in kW)' }]}
                series={[
                  { data: windP, label: 'WIND ENERGY' },
                  { data: solarP, label: 'SOLAR ENERGY' }
                ]}
                width={500}
                height={300}
              />
            </div>
          </Link>
        </div>

        <div className='third_2' onClick={clickwind}>
          <div style={{ marginTop: '-60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>
            <h3>Wind Mill</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
            <TbWindmill size={60} />
          </div>
          <div style={{ margin: '20px 0px 8px 0px',display:'flex',justifyContent:'center',fontSize:'20px'  }}>Power Generation</div>
          <div style={{margin: '0px 0px 8px 10px'}}>Current:{windP[0]?.toFixed(2)} kW</div>
          <div style={{ margin: '0px 0px 8px 10px' }}>Max: {maxw} kW</div>
          <div style={{ margin: '0px 0px 0px 10px' }}>Low: {minw} kW</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard2;
