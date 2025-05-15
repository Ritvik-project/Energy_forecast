import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaWind } from 'react-icons/fa';
import { IoIosSunny } from 'react-icons/io';
import { setCoordinates, fetchEnergyData } from './features/energySlice';

const Dashboard1 = () => {
  const dispatch = useDispatch();

  const {
    temperature,
    sunlight,
    windspeed,
    latitude,
    longitude,
    time,
    date
  } = useSelector((state) => ({
    temperature: state.energy.temperature || [],
    sunlight: state.energy.sunlight || [],
    windspeed: state.energy.windspeed || [],
    latitude: state.energy.latitude,
    longitude: state.energy.longitude,
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
  }));

  useEffect(() => {
    dispatch(fetchEnergyData({ latitude, longitude }));
  }, [dispatch, latitude, longitude]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCoordinates({ ...{ latitude, longitude }, [name]: parseFloat(value) }));
  };

  return (
    <>
      <div>
        <div className="parent">
          <div className="Dash_U bg-gray-700">
            <div className="left_side">
              <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: '20px', position:'relative',top:'0' }}>
                <div>
                  Latitude:{' '}
                  <input
                    className="outline-hidden border-none"
                    value={latitude}
                    name="latitude"
                    onChange={handleInputChange}
                    type="text"
                  />
                </div>
                <div>
                  Longitude:{' '}
                  <input
                    className="outline-hidden border-none"
                    value={longitude}
                    name="longitude"
                    onChange={handleInputChange}
                    type="text"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h1 className="h1A">38{temperature[0]}{'\u00B0'}C</h1>{' '}
                {/* <h1 className="h1B" style={{marginTop:'10px'}}>{'\u00B0'}C</h1> */}
              </div>

              <div className="same_l">
                <div>
                  <FaCalendarAlt />
                </div>
                <div>{date}</div>
                <div>{time}</div>
              </div>
            </div>

            <div className="right_side">
              <div className="same_l">
                <div>
                  <FaWind />
                </div>
                <div>{windspeed[0]}</div>
              </div>
              <div className="same_l">
                <div>
                  <IoIosSunny />
                </div>
                <div>20{sunlight[0]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard1;
