import { createAction, handleActions } from 'redux-actions';

const CHANGE = 'MENU/CHANGE';
const LOAD = 'MARKER/LOAD';
const INSERT = 'MARKER/INSERT';
const REMOVE = 'MARKER/REMOVE';
const REOMVE_ALL = 'MARKER/REMOVEALL';

export const change = createAction(CHANGE);
export const load = createAction(LOAD);
export const insert = createAction(INSERT);
export const remove = createAction(REMOVE);
export const removeAll = createAction(REOMVE_ALL);

const initialMarkersState = {
  menu: 'TRIP',
  marker: [],
};

const marker = handleActions(
  {
    [CHANGE]: (state, { payload }) => ({
      menu: payload.clickedMenu,
      marker: [],
    }),
    [LOAD]: (state, { payload: markers }) => ({
      ...state,
      marker: markers.data || markers.prevMarkers,
    }),
    [INSERT]: (state, { payload: data }) => ({
      ...state,
      marker: state.marker.concat(data),
    }),
    [REMOVE]: (state, { payload }) => {
      const removedMarker = state.marker.filter((m) => m.id === payload.id);

      if (removedMarker[0].order) {
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
    [REOMVE_ALL]: (state, { payload }) => initialMarkersState,
  },
  initialMarkersState,
);

export default marker;
