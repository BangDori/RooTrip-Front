import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

import userReducer from './user';
import markerReducer from './marker';

import login from './middleware/login';
import logout from './middleware/logout';
import reIssue from './middleware/reIssue';

const store = configureStore({
  reducer: {
    user: userReducer,
    marker: markerReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    // logger,
    login,
    reIssue,
    logout,
  ],
});

export default store;
