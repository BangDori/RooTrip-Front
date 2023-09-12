import { createSlice } from '@reduxjs/toolkit';

const customSlice = createSlice({
  name: 'custom',
  initialState: {
    isCustomMode: false,
    isSetCoordinate: false,
    fileName: '',
    latitude: -1,
    longitude: -1,
  },
  reducers: {
    loadFile: (state, action) => {
      const { fileName } = action.payload;

      state.isCustomMode = true;
      state.fileName = fileName;
    },
    setCoordinateFile: (state, action) => {
      const { latitude, longitude } = action.payload;

      state.isSetCoordinate = true;
      state.latitude = latitude;
      state.longitude = longitude;
    },
    endFile: (state) => {
      state.isCustomMode = false;
      state.isSetCoordinate = false;
      state.fileName = '';
      state.latitude = -1;
      state.longitude = -1;
    },
  },
});

export const { loadFile, setCoordinateFile, endFile } = customSlice.actions;
export default customSlice.reducer;
