import { combineReducers } from 'redux';

import accessToken from './accessToken';
import article from './article';

const rootReducer = combineReducers({
  accessToken,
  article,
});

export default rootReducer;
