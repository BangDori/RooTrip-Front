import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    polygon:
      'Polygon((31.44658832099043 119.91334975075642, 41.128423975299484 142.2866502492372, 41.128423975299484 119.91334975075642, 31.44658832099043 119.91334975075642))',
    center: [131.1, 36.4395],
    zoom: 5.5,
  },
  reducers: {
    changeMap: (state, action) => {
      const { center, polygon, zoom } = action.payload;

      state.polygon = polygon;
      state.center = center;
      state.zoom = zoom;
    },
    resetMap: (state) => {
      state.polygon =
        'Polygon((31.44658832099043 119.91334975075642, 41.128423975299484 142.2866502492372, 41.128423975299484 119.91334975075642, 31.44658832099043 119.91334975075642))';
      state.center = [131.1, 36.4395];
      state.zoom = 5.5;
    },
  },
});

export const { changeMap, resetMap } = mapSlice.actions;
export default mapSlice.reducer;
