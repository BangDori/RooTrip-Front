import { combineReducers } from 'redux';

import auth from './auth-store';
import article from './article';
import marker from './marker';
import location from './location';
import map from './map';

const rootReducer = combineReducers({
  auth,
  article,
  marker,
  location,
  map,
});

export default rootReducer;
