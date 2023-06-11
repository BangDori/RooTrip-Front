import { combineReducers } from 'redux';

import accessToken from './accessToken';
import article from './article';
import marker from './marker';
import location from './location';
import map from './map';

const rootReducer = combineReducers({
  accessToken,
  article,
  marker,
  location,
  map,
});

export default rootReducer;
