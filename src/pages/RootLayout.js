import { useCallback, useEffect } from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Map from '@components/Map';
import { setTokens, getTokenDuration } from '@utils/token';
import { reIssueAPI } from '@services/auth';

const RootLayout = () => {
  const accesstoken = useLoaderData();
  const refreshtoken = Cookies.get('refreshtoken');
  const navigate = useNavigate();

  const reIssueToken = useCallback(async () => {
    const reIssueForm = {
      grant_type: 'refresh_token',
      refresh_token: refreshtoken,
    };
    const response = await reIssueAPI(reIssueForm);
    const resData = await response.json();

    const { accessToken, expire } = resData.data;
    setTokens(accessToken, refreshtoken, expire);

    navigate('/trip');
  }, [refreshtoken, navigate]);

  useEffect(() => {
    if (!accesstoken) {
      if (refreshtoken) reIssueToken();
      return;
    }

    if (accesstoken === 'EXPIRED') {
      reIssueToken();
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      reIssueToken();
    }, tokenDuration);
  }, [navigate, accesstoken, refreshtoken, reIssueToken]);

  return (
    <>
      <Map />
      <Outlet />
    </>
  );
};

export default RootLayout;
