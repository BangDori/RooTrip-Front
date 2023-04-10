import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reIssue } from '@services/user';
import { issue } from '@store/accessToken';
import { getRefreshToken } from '@utils/authCookie';

const useAccessToken = (accessToken, expireTime) => {
  const dispatch = useDispatch();
  const refreshToken = getRefreshToken();

  useEffect(() => {
    const tokenReIssue = async () => {
      const token = await reIssue();

      if (token) dispatch(issue(token));
    };

    if (accessToken) {
      const timeout = setTimeout(() => {
        tokenReIssue();
      }, expireTime); // expireTime까지의 시간
    }

    if (refreshToken) tokenReIssue();
  }, [accessToken, dispatch, expireTime, refreshToken]);
};

export default useAccessToken;
