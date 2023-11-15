import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    center: [131.1, 36.4395],
    zoom: 5.5,
  },
  reducers: {
    changeMap: (state, action) => {
      const { center, zoom } = action.payload;

      state.center = center;
      state.zoom = zoom;
    },
    resetMap: (state) => {
      state.center = [131.1, 36.4395];
      state.zoom = 5.5;
    },
  },
});

export const { changeMap, resetMap } = mapSlice.actions;
export default mapSlice.reducer;
