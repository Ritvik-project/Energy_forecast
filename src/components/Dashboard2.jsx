import React, { useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineSolarPower } from "react-icons/md";
import { TbWindmill } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnergyData } from './features/energySlice';

const Dashboard2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { solar = [], wind = [], time =[] } = useSelector((state) => state.energy);

  useEffect(() => {
    dispatch(fetchEnergyData());
  }, [dispatch]);

  const hours = time.slice(0, 12).map((timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    return `${hours}`;
  });

  const solarP = solar.slice(0, 12).map((val) => val / 1000);
  const windP = wind.slice(0, 12).map((val) => val / 1000);

  const maxs = Math.max(...solarP).toFixed(2);
  const mins = Math.min(...solarP).toFixed(2);
  const maxw = Math.max(...windP).toFixed(2);
  const minw = Math.min(...windP).toFixed(2);

  const clicksolar = () => navigate('/solaroutput');
  const clickwind = () => navigate('/windoutput');

  return (
    <>
      <div className='second_dash'>
        <div className='first_2' onClick={clicksolar}>
          <div style={{ marginTop: '-110px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>
            <h3>Solar Panel</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
            <MdOutlineSolarPower size={60} />
          </div>

          <div style={{ margin: '20px 0px 8px 8px' }}>Power Generation</div>
          <div style={{margin: '0px 0px 0px 8px'}}>Current: {solarP[0]?.toFixed(2)} kW</div>
          <div style={{ margin: '0px 0px 8px 8px' }}>Max: {maxs} kW</div>
          <div style={{ margin: '0px 0px 0px 8px' }}>Low: {mins} kW</div>
        </div>

        <div className='second_2'>
          <Link to='./forteen_days'>
            <div>
              <LineChart
                xAxis={[{ data: hours, label: 'Time (in hours)' }]}
                yAxis={[{ label: 'Power Generation (in kW)' }]}
                series={[
                  { data: solarP, label: 'Solar Panel' },
                  { data: windP, label: 'Windmill' }
                ]}
                width={500}
                height={300}
              />
            </div>
          </Link>
        </div>

        <div className='third_2' onClick={clickwind}>
          <div style={{ marginTop: '-110px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>
            <h3>Wind Mill</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
            <TbWindmill size={60} />
          </div>
          <div style={{ margin: '20px 0px 8px 8px' }}>Power Generation</div>
          <div style={{margin: '0px 0px 0px 8px'}}>Current:{windP[0]?.toFixed(2)} kW</div>
          <div style={{ margin: '0px 0px 8px 8px' }}>Max: {maxw} kW</div>
          <div style={{ margin: '0px 0px 0px 8px' }}>Low: {minw} kW</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard2;
