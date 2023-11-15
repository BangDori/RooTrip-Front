import { redirect } from 'react-router-dom';

import { getAuthToken } from '@utils/token';
import store from '@store/configureStore';
import { MAIN_SERVER } from '@config/server-config';
import { loadMarkers } from '@store/marker';

export async function loader() {
  const { accesstoken } = getAuthToken();

  if (!accesstoken) {
    return redirect('/');
  }

  // Marker 받아오기
  const { polygon } = store.getState().map;
  const { accessToken } = store.getState().user;

  const response = await fetch(
    `${MAIN_SERVER}/api/post?polygon=${polygon}&viewType=city`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const resData = await response.json();

  if (!resData.status) {
    return null;
  }

  const { data: files } = resData;
  const markers = { files };

  store.dispatch(loadMarkers(markers));
  return null;
}
