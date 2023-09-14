import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import GNB from '@components/common/GNB';
import Map from '@components/mapbox/Map';
import store from '@store/configureStore';
import { resetMarkers } from '@store/marker';
import { reIssueStore } from '@store/user';
import { getRefreshToken } from '@utils/token';

const RootLayout = () => {
  const { accessToken, expiration } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const refreshtoken = getRefreshToken('refreshtoken');
  const navigate = useNavigate();

  const reIssueToken = useCallback(async () => {
    await store.dispatch(reIssueStore(refreshtoken));
    if (pathname === '/') navigate('/trip');
  }, [pathname, navigate, refreshtoken]);

  useEffect(() => {
    if (!accessToken) {
      if (refreshtoken) reIssueToken();
      return;
    }

    const interval = expiration - new Date().getTime();

    const timer = setTimeout(() => {
      reIssueToken();
    }, interval);

    return () => clearInterval(timer);
  }, [navigate, accessToken, expiration, refreshtoken, reIssueToken]);

  return (
    <>
      {accessToken && <GNB />}
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

  return null;
}
