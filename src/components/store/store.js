import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '../features/locationSlice.js';
import energyReducer from '../features/energySlice.js';

export const store = configureStore({
  reducer: {
    location: locationReducer,
    energy: energyReducer,
  },
});
export default store;