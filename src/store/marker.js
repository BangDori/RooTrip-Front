import { createSlice } from '@reduxjs/toolkit';

const markerSlice = createSlice({
  name: 'marker',
  initialState: {
    markers: [],
    type: 'TRIP',
    onError: '',
  },
  reducers: {
    loadMarkers: (state, action) => {
      const { files } = action.payload;
      const filteredMarkers = files.filter((newFile) => {
        let isUnique = true;
        for (let i = 0; i < state.markers.length; i += 1) {
          if (state.markers[i].fileName === newFile.fileName) {
            isUnique = false;
            return null;
          }
        }

        if (isUnique) {
          return newFile;
        }

        return null;
      });

      if (filteredMarkers.length !== files.length) {
        state.onError = '동일한 파일은 업로드할 수 없습니다.';
      }
      state.markers = [...state.markers, ...filteredMarkers];
    },
    updateMarker: (state, action) => {
      const { updatedFileName, updatedLat, updatedLng } = action.payload;

      const updatedMarkers = state.markers.map((marker) =>
        marker.fileName === updatedFileName
          ? {
              ...marker,
              status: 'specified',
              coordinate: { latitude: updatedLat, longitude: updatedLng },
            }
          : marker,
      );

      state.markers = updatedMarkers;
    },
    removeMarker: (state, action) => {
      const { fileName } = action.payload;

      const removedMarkers = state.markers.filter(
        (marker) => marker.fileName !== fileName,
      );

      state.markers = removedMarkers;
    },
    resetMarkers: (state, action) => {
      const { type } = action.payload;

      state.markers = [];
      state.type = type;
    },
  },
});

export const { loadMarkers, updateMarker, removeMarker, resetMarkers } =
  markerSlice.actions;
export default markerSlice.reducer;
