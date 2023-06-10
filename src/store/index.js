import { combineReducers } from 'redux';

import accessToken from './accessToken';
import article from './article';
import marker from './marker';
import location from './location';

const rootReducer = combineReducers({
  accessToken,
  article,
  marker,
  location,
});

export default rootReducer;
