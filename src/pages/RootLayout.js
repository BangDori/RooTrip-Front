import { useCallback, useEffect } from 'react';
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import GNB from '@components/common/GNB';
import Map from '@components/mapbox/Map';
import store from '@store/configureStore';
import { resetMarkers } from '@store/marker';
import { reIssueStore } from '@store/user';
import { getAuthToken, getRefreshToken } from '@utils/token';

const RootLayout = () => {
  const { accesstoken, expiration } = useLoaderData();
  const { pathname } = useLocation();
  const refreshtoken = getRefreshToken('refreshtoken');
  const navigate = useNavigate();

  const reIssueToken = useCallback(async () => {
    await store.dispatch(reIssueStore(refreshtoken));
    if (pathname === '/') navigate('/trip');
  }, [pathname, navigate, refreshtoken]);

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
      {accesstoken && <GNB />}
      <Map />
      <Outlet />
    </>
  );
};

export default RootLayout;

export function loader({ request }) {
  const { pathname } = new URL(request.url);

  const { type: prevType } = store.getState().marker;

  let type = 'TRIP';
  if (pathname.includes('profile')) {
    type = 'PROFILE';
  } else if (pathname.includes('route')) {
    type = 'ROUTE';
  } else if (pathname.includes('write')) {
    type = 'WRITE';
  }

  if (type !== prevType) {
    store.dispatch(resetMarkers({ type, prevType }));
  }

  const isToken = store.getState('token').user.accesstoken;

  if (isToken) {
    return null;
  }

  const token = getAuthToken();
  return token;
}
