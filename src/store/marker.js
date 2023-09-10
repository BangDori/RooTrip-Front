import { createSlice } from '@reduxjs/toolkit';

const markerSlice = createSlice({
  name: 'marker',
  initialState: {
    markers: [],
    type: 'TRIP',
  },
  reducers: {
    loadMarkers: (state, action) => {
      const { files } = action.payload;
      const filteredMarkers = files.filter((newFile) => {
        if (!newFile.dateTime) return null;

        let isUnique = true;
        for (let i = 0; i < state.markers.length; i += 1) {
          if (state.markers[i].fileName === newFile.fileName) {
            isUnique = false;
            return;
          }
        }

        if (isUnique) {
          return newFile;
        }

        return null;
      });

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
