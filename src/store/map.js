import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    viewType: 'region',
    center: [131.1, 36.4395],
    markerCount: 10,
    polygon: '',
    zoom: 5.5,
  },
  reducers: {
    changeMap: (state, action) => {
      const { viewType, center, polygon, zoom } = action.payload;

      let markerCount = 10;
      if (viewType === 'city') {
        markerCount = 15;
      }

      state.viewType = viewType;
      state.center = center;
      state.markerCount = markerCount;
      state.polygon = polygon;
      state.zoom = zoom;
    },
    resetMap: (state) => {
      state.viewType = 'region';
      state.center = [131.1, 36.4395];
      state.markerCount = 8;
      state.polygon = '';
      state.zoom = '5.5';
    },
  },
});

export const { changeMap, resetMap } = mapSlice.actions;
export default mapSlice.reducer;
