import { combineReducers } from 'redux';

import accessToken from './accessToken';
import article from './article';
import marker from './marker';
import menu from './menu';

const rootReducer = combineReducers({
  accessToken,
  article,
  marker,
  menu,
});

export default rootReducer;
