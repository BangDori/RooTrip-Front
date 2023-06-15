import { createAction, handleActions } from 'redux-actions';

const SET = 'MAP/SET';
const CHANGE = 'MAP/CHANGE';
const RESET = 'MAP/RESET';

export const setCoordinatesOnMap = createAction(SET);
export const setChangeCoordinate = createAction(CHANGE);
export const resetMap = createAction(RESET);

const initialCoordinatesOnMap = {
  viewType: 0,
  currentZoom: 0,
  markerCount: 8,
  polygon: '',
  center: [131.1, 36.4395],
  zoom: 5.5,
};

const map = handleActions(
  {
    [SET]: (state, action) => ({
      ...action.payload,
      center: [],
    }),
    [CHANGE]: (state, { payload }) => ({
      ...state,
      center: payload.data?.center || payload.map?.center,
      zoom: payload.data?.zoom || payload.map?.zoom,
    }),
    [RESET]: (state, action) => initialCoordinatesOnMap,
  },
  initialCoordinatesOnMap,
);

export default map;
