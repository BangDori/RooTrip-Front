import { combineReducers } from 'redux';

import auth from './auth-store';
import map from './map-store';
import marker from './marker-store';
import photoLocation from './photoLocation-store';
import post from './post-store';

const rootReducer = combineReducers({
  auth,
  map,
  marker,
  photoLocation,
  post,
});

export default rootReducer;
