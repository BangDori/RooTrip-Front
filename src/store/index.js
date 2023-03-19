import { combineReducers } from 'redux';
import accessToken from './accessToken';

const rootReducer = combineReducers({
  accessToken,
});

export default rootReducer;
