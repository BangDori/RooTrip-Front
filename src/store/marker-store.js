import { createAction, handleActions } from 'redux-actions';

const LOAD = 'MARKER/LOAD';
const INSERT = 'MARKER/INSERT';
const INSERT_USER_MARKER = 'MRKER/INSERT_USER_MARKER';
const REMOVE = 'MARKER/REMOVE';
const REOMVE_ALL = 'MARKER/REMOVEALL';

export const loadMarkers = createAction(LOAD);
export const insertUserMarker = createAction(INSERT_USER_MARKER);
export const insertMarker = createAction(INSERT);
export const removeMarker = createAction(REMOVE);
export const removeAllMarkers = createAction(REOMVE_ALL);

const markerState = {
  marker: [],
  userMarker: [],
};

const marker = handleActions(
  {
    [LOAD]: (state, { payload: markers }) => ({
      ...state,
      marker: markers.prevMarkers,
    }),
    [INSERT]: (state, { payload: data }) => ({
      ...state,
      marker: state.marker.concat(data),
    }),
    [INSERT_USER_MARKER]: (state, { payload: data }) => ({
      ...state,
      userMarker: state.userMarker.concat(data),
    }),
    [REMOVE]: (state, { payload }) => {
      const removedMarker = state.marker.filter((m) => m.id === payload.id);

      if (removedMarker[0]?.order) {
        return {
          ...state,
          marker: state.marker
            .filter((m) => m.id !== payload.id)
            .map((m) =>
              m.order > removedMarker[0].order
                ? { ...m, order: m.order - 1 }
                : m,
            ),
        };
      }

      return {
        ...state,
        marker: state.marker.filter((m) => m.postId !== payload.postId),
      };
    },
    [REOMVE_ALL]: (state, { payload }) => ({
      ...state,
      marker: [],
    }),
  },
  markerState,
);

export default marker;
