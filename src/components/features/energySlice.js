import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEnergyData = createAsyncThunk(
  'energy/fetchEnergyData',
  async ({ latitude, longitude }) => {
    const response = await fetch(`https://cb51-49-249-148-147.ngrok-free.app/predict?latitude=${latitude}&longitude=${longitude}`);
    const data = await response.json();
    console.log(data);
    return data.hourly;
  }
);

const energySlice = createSlice({
  name: 'energy',
  initialState: {
    latitude: 25.2623,
    longitude: 82.9893,
    solarEnergy: [],
    windEnergy: [],
    formattedTime: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setCoordinates: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnergyData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEnergyData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.solarEnergy = action.payload.solar_energy;
        state.windEnergy = action.payload.wind_energy;
        state.formattedTime = action.payload.formatted_time;
      })
      .addCase(fetchEnergyData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setCoordinates } = energySlice.actions; 
export default energySlice.reducer;
