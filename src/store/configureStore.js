import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

import userReducer from './user';
import customReducer from './custom';
import markerReducer from './marker';

import login from './middleware/login';
import reIssue from './middleware/reIssue';
import logout from './middleware/logout';
import updateCoord from './middleware/updateCoord';

const store = configureStore({
  reducer: {
    user: userReducer,
    custom: customReducer,
    marker: markerReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    // logger,
    login,
    reIssue,
    logout,
    updateCoord,
  ],
});

export default store;
