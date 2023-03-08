import { useState, useEffect } from 'react';
import { getAccessToken, getRefreshToken, setAccessToken } from '../utils/auth';
import { reIssue } from '../services/user'; // assume this is the function that issues new tokens

const useToken = () => {
  const [accessToken, setAccessTokenState] = useState(getAccessToken());

  useEffect(() => {
    const refreshToken = getRefreshToken();

    if (refreshToken && !accessToken) {
      const { accessToken, expire } = reIssue('refresh_token', refreshToken);
      setAccessToken(accessToken, expire);
      setAccessTokenState(accessToken);
    }
  }, [accessToken]);

  return accessToken;
};

export default useToken;
