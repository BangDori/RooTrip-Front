import { createSlice } from '@reduxjs/toolkit';

const markerSlice = createSlice({
  name: 'marker',
  initialState: {
    markers: [],
    type: 'PROFILE',
  },
  reducers: {
    loadMarkers: (state, action) => {
      const { photos } = action.payload;
      const filteredMarkers = photos.filter((photo) => photo.dateTime);

      state.markers = [...state.markers, ...filteredMarkers];
    },
    removeMarker: (state, action) => {
      const { fileName } = action.payload;

      state.markers = state.markers.filter(
        (marker) => marker.fileName !== fileName,
      );
    },
    resetMarkers: (state, { payload }) => {
      state.markers = [];
      state.type = payload;
    },
  },
});

export const { loadMarkers, removeMarker, resetMarkers } = markerSlice.actions;
export default markerSlice.reducer;
