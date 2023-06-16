import { combineReducers } from 'redux';

import auth from './auth-store';
import location from './location';
import map from './map';
import marker from './marker';
import post from './post-store';

const rootReducer = combineReducers({
  auth,
  location,
  map,
  marker,
  post,
});

export default rootReducer;
