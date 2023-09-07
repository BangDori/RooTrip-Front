import { createSlice } from '@reduxjs/toolkit';

const markerSlice = createSlice({
  name: 'marker',
  initialState: {
    markers: [],
    type: 'TRIP',
  },
  reducers: {
    loadMarkers: (state, action) => {
      const { photos, type } = action.payload;
      const filteredMarkers = photos.filter((photo) => photo.dateTime);

      state.type = type;
      state.markers = [...state.markers, ...filteredMarkers];
    },
    resetMarkers: (state) => {
      state.markers = [];
    },
  },
});

export const { loadMarkers, resetMarkers } = markerSlice.actions;
export default markerSlice.reducer;
