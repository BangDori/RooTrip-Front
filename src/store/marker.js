import { createAction, handleActions } from 'redux-actions';

const LOAD = 'MARKER/LOAD';
const INSERT = 'MARKER/INSERT';
const REMOVE_ON_MAP = 'MAP/REMOVE';
const REMOVE_ON_STORE = 'MARKER/REMOVE';
const REOMVE_ALL = 'MARKER/REMOVEALL';

export const load = createAction(LOAD);
export const insert = createAction(INSERT);
export const removeOnMap = createAction(REMOVE_ON_MAP);
export const removeOnStore = createAction(REMOVE_ON_STORE);
export const removeAll = createAction(REOMVE_ALL);

const initialMarkersState = {
  markers: [],
  removeID: -1, // 0(All) or id
};

const marker = handleActions(
  {
    [LOAD]: (state, { payload: markers }) => ({
      markers: markers.data,
      removeID: -1,
    }),
    [INSERT]: (state, { payload: data }) => ({
      markers: state.markers.concat(data),
      removeID: -1,
    }),
    [REMOVE_ON_MAP]: (state, { payload }) => ({
      ...state,
      removeID: payload.id,
    }),
    [REMOVE_ON_STORE]: (state, { payload }) => ({
      markers: state.markers.filter((m) => m.postId !== payload.id),
      removeID: -1,
    }),
    [REOMVE_ALL]: (state, { payload }) => initialMarkersState,
  },
  initialMarkersState,
);

export default marker;
