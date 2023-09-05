import Cookies from 'js-cookie';

import { logoutAPI } from '@services/auth';

import { logoutAPICall } from '../api';

const logout =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== logoutAPICall.type) return next(action);

    const { type } = action.payload;

    await logoutAPI();
    Cookies.remove('refreshtoken');

    dispatch({ type });
  };

export default logout;
