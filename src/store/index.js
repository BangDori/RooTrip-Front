import { combineReducers } from 'redux';

import accessToken from './accessToken';
import article from './article';
import marker from './marker';

const rootReducer = combineReducers({
  accessToken,
  article,
  marker,
});

export default rootReducer;
