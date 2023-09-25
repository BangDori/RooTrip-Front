import { createSlice } from '@reduxjs/toolkit';

import { loginAPICall, logoutAPICall, reIssueAPICall } from './api';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    accessToken: '',
    expiration: 0,
  },
  reducers: {
    loginUser: (state, action) => {
      const { accessToken, expiration } = action.payload;

      state.accessToken = accessToken;
      state.expiration = expiration;
    },
    logoutUser: (state) => {
      state.accessToken = '';
      state.expiration = 0;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

export const loginStore = (payload) =>
  loginAPICall({
    type: loginUser.type,
    payload,
  });

export const reIssueStore = (refreshtoken) =>
  reIssueAPICall({
    type: loginUser.type,
    refreshtoken,
  });

export const logoutStore = () =>
  logoutAPICall({
    type: logoutUser.type,
  });
