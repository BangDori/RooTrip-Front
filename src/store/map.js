import { createAction, handleActions } from 'redux-actions';

const SET = 'MAP/SET';

export const setCoordinatesOnMap = createAction(SET);

const initialCoordinatesOnMap = {
  viewType: 0,
  currentZoom: 0,
  markerCount: 8,
  polygon: '',
};

const map = handleActions(
  {
    [SET]: (state, action) => action.payload,
  },
  initialCoordinatesOnMap,
);

export default map;
