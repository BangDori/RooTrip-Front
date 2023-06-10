import { createAction, handleActions } from 'redux-actions';

const SET = 'LOCATION/SET';
const UPDATE = 'LOCATION/UPDATE';
const FINISH = 'LOCATION/FINISH';

export const setLocation = createAction(SET);
export const updateLocation = createAction(UPDATE);
export const finishLocation = createAction(FINISH);

const initialLocation = {
  fileName: '',
  isSetLocation: false,
  latitude: '',
  longitude: '',
};

const location = handleActions(
  {
    [SET]: (state, { payload: fileName }) => ({
      ...state,
      fileName,
      isSetLocation: true,
    }),
    [UPDATE]: (state, { payload: coordinate }) => ({
      ...state,
      latitude: coordinate.lat,
      longitude: coordinate.lng,
    }),
    [FINISH]: (state, action) => initialLocation,
  },
  initialLocation,
);

export default location;
