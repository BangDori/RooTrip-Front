import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reIssue } from '@services/user';
import { issue } from '@store/accessToken';
import { getRefreshToken } from '@utils/AuthCookie';

const useAccessToken = (accessToken, expireTime) => {
  const dispatch = useDispatch();
  const refreshToken = getRefreshToken();

  useEffect(() => {
    const tokenReIssue = async () => {
      try {
        const token = await reIssue();
        dispatch(issue(token));
      } catch (e) {
        console.log(e);
      }
    };

    if (accessToken) {
      const timeout = setTimeout(() => {
        tokenReIssue();
      }, expireTime);

      return () => {
        clearTimeout(timeout);
      };
    } else if (refreshToken) {
      tokenReIssue();
    }
  }, [accessToken, dispatch, expireTime, refreshToken]);
};

export default useAccessToken;
