import { combineReducers } from 'redux';

import auth from './auth-store';
import photoLocation from './photoLocation-store';
import map from './map';
import marker from './marker';
import post from './post-store';

const rootReducer = combineReducers({
  auth,
  map,
  marker,
  photoLocation,
  post,
});

export default rootReducer;
