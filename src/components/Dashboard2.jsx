import React, { useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineSolarPower } from "react-icons/md";
import { TbWindmill } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnergyData } from './features/energySlice'; // Adjust path as needed
import '../css/Dashboard2.css'; // Import the custom CSS

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

  const solarP = solarEnergy.slice(6, 18).map((val) => val / 20000);
  const windP = windEnergy.slice(6, 18).map((val) => val / 1000);

  const maxs = solarP.length ? Math.max(...solarP).toFixed(2) : 'N/A';
  const maxw = windP.length ? Math.max(...windP).toFixed(2) : 'N/A';
  
  const filteredSolarP = solarP.filter((val) => val > 0);
  const filteredWindP = windP.filter((val) => val > 0);

  const mins = filteredSolarP.length ? Math.min(...filteredSolarP).toFixed(2) : 'N/A';
  const minw = filteredWindP.length ? Math.min(...filteredWindP).toFixed(2) : 'N/A';

  const clicksolar = () => navigate('/solaroutput');
  const clickwind = () => navigate('/windoutput');

  return (
    <div className="energy-dashboard-grid">
      {/* Solar Panel Card */}
      <div className="energy-card solar-card" onClick={clicksolar}>
        <h3 className="card-title">Solar Panel</h3>
        <div className="icon-container">
          <div className="solar-icon">
            <MdOutlineSolarPower size={60} />
          </div>
        </div>
        
        <div className="section-title">Power Generation</div>
        
        <div className="data-row">
          <span className="data-label">Current:</span>
          <span className="data-value">{solarP[0]?.toFixed(2) || 'N/A'} kW</span>
        </div>
        
        <div className="data-row">
          <span className="data-label">Max:</span>
          <span className="data-value">{maxs} kW</span>
        </div>
        
        <div className="data-row">
          <span className="data-label">Low:</span>
          <span className="data-value">{mins} kW</span>
        </div>
      </div>

      {/* Chart Card */}
      <Link to="./forteen_days" className="chart-link">
        <div className="energy-card chart-card">
          <h3 className="card-title">Energy Production</h3>
          <div className="chart-container">
            <LineChart
              xAxis={[{ 
                data: hours, 
                label: 'Time (hours)',
                tickLabelStyle: {
                  angle: 0,
                  textAnchor: 'middle',
                  fontSize: 12
                }
              }]}
              yAxis={[{ 
                label: 'Power (kW)',
                labelStyle: {
                  fontSize: 12
                }
              }]}
              series={[
                { 
                  data: windP, 
                  label: 'Wind Energy',
                  color: '#0ea5e9',
                  showMark: false,
                  curve: 'natural'
                },
                { 
                  data: solarP, 
                  label: 'Solar Energy',
                  color: '#f97316',
                  showMark: false,
                  curve: 'natural'
                }
              ]}
              width={500}
              height={300}
              margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
              slotProps={{
                legend: {
                  direction: 'row',
                  position: { vertical: 'bottom', horizontal: 'center' },
                  padding: 20,
                  itemMarkWidth: 10,
                  itemMarkHeight: 10,
                  markGap: 5,
                  itemGap: 15
                }
              }}
            />
          </div>
        </div>
      </Link>

      {/* Wind Mill Card */}
      <div className="energy-card wind-card" onClick={clickwind}>
        <h3 className="card-title">Wind Mill</h3>
        <div className="icon-container">
          <div className="wind-icon">
            <TbWindmill size={60} />
          </div>
        </div>
        
        <div className="section-title">Power Generation</div>
        
        <div className="data-row">
          <span className="data-label">Current:</span>
          <span className="data-value">{windP[0]?.toFixed(2) || 'N/A'} kW</span>
        </div>
        
        <div className="data-row">
          <span className="data-label">Max:</span>
          <span className="data-value">{maxw} kW</span>
        </div>
        
        <div className="data-row">
          <span className="data-label">Low:</span>
          <span className="data-value">{minw} kW</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard2;