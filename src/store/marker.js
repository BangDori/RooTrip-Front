import { createAction, handleActions } from 'redux-actions';

const LOAD = 'MARKER/LOAD';
const REMOVE = 'MARKER/REMOVE';

export const load = createAction(LOAD);
export const remove = createAction(REMOVE);

const markersState = [];

const marker = handleActions(
  {
    [LOAD]: (state, { payload }) => payload.markers,
    [REMOVE]: (state, action) => [],
  },
  markersState,
);

export default marker;
