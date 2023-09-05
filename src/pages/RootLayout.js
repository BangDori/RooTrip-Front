import { useCallback, useEffect } from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';

import Map from '@components/Map';
import store from '@store/configureStore';
import { reIssueStore } from '@store/user';
import { getRefreshToken } from '@utils/token';

const RootLayout = () => {
  const { accesstoken, expiration } = useLoaderData();
  const refreshtoken = getRefreshToken('refreshtoken');
  const navigate = useNavigate();

  const reIssueToken = useCallback(async () => {
    await store.dispatch(reIssueStore(refreshtoken));
    navigate('/trip');
  }, [navigate, refreshtoken]);

  useEffect(() => {
    if (!accesstoken) {
      if (refreshtoken) reIssueToken();
      return;
    }

    if (expiration <= 0) {
      reIssueToken();
      return;
    }

    setTimeout(() => {
      reIssueToken();
    }, expiration);
  }, [navigate, accesstoken, expiration, refreshtoken, reIssueToken]);

  return (
    <>
      <Map />
      <Outlet />
    </>
  );
};

export default RootLayout;
