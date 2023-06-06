import { combineReducers } from 'redux';

import accessToken from './accessToken';
import article from './article';
import marker from './marker';
import menu from './menu';
import location from './location';

const rootReducer = combineReducers({
  accessToken,
  article,
  marker,
  menu,
  location,
});

export default rootReducer;
