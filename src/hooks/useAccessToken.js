import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { reIssue } from '@services/user';
import { issue } from '@store/accessToken';
import { getRefreshToken } from '@utils/authCookie';

const useAccessToken = (accessToken, expireTime) => {
  const dispatch = useDispatch();
  const refreshToken = getRefreshToken();
  const timer = useRef(null);

  useEffect(() => {
    const tokenReIssue = async () => {
      const token = await reIssue();

      if (token) dispatch(issue(token));
    };

    if (accessToken) {
      timer.current = setTimeout(() => {
        tokenReIssue();
      }, expireTime); // expireTime까지의 시간
    }

    // 강제 렌더링
    if (!accessToken && refreshToken) tokenReIssue();

    return () => clearInterval(timer.current);
  }, [accessToken, dispatch, expireTime, refreshToken]);
};

export default useAccessToken;
