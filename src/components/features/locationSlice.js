import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latitude: 25.2623,
  longitude: 82.9893,
  position: { lat: 25.2623, lng: 82.9893 },
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
      state.latitude = action.payload.lat;
      state.longitude = action.payload.lng;
    },
  },
});

export const { setLatitude, setLongitude, setPosition } = locationSlice.actions;
export default locationSlice.reducer;
