import { createAction, handleActions } from 'redux-actions';

const LOAD = 'MARKER/LOAD';
const INSERT = 'MARKER/INSERT';
const REMOVE = 'MARKER/REMOVE';
const REOMVE_ALL = 'MARKER/REMOVEALL';

export const load = createAction(LOAD);
export const insert = createAction(INSERT);
export const remove = createAction(REMOVE);
export const removeAll = createAction(REOMVE_ALL);

const initialMarkersState = [];

const marker = handleActions(
  {
    [LOAD]: (state, { payload: markers }) => markers.data,
    [INSERT]: (state, { payload: data }) => state.concat(data),
    [REMOVE]: (state, { payload }) => {
      const removedMarker = state.filter((m) => m.id === payload.id);

      return state
        .filter((m) => m.id !== payload.id)
        .map((m) =>
          m.order > removedMarker[0].order ? { ...m, order: m.order - 1 } : m,
        );
    },
    [REOMVE_ALL]: (state, { payload }) => initialMarkersState,
  },
  initialMarkersState,
);

export default marker;
