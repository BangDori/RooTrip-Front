import { combineReducers } from 'redux';

import auth from './auth-store';
import post from './post-store';
import marker from './marker';
import location from './location';
import map from './map';

const rootReducer = combineReducers({
  auth,
  location,
  map,
  marker,
  post,
});

export default rootReducer;
