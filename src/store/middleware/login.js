import { getExpiration, setRefreshToken } from '@utils/token';

import { loginAPICall } from '../api';

const login =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type !== loginAPICall.type) return next(action);

    const { type, payload } = action.payload;
    const { accessToken, refreshToken, expire } = payload;

    const expiration = getExpiration(expire);
    const tokens = { accessToken, expiration };

    dispatch({ type, payload: tokens });
    setRefreshToken(refreshToken);
  };

export default login;
