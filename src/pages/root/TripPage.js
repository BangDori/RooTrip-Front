import { redirect } from 'react-router-dom';

import { getAuthToken } from '@utils/token';

export async function loader() {
  const { accesstoken } = getAuthToken();

  if (!accesstoken) {
    return redirect('/');
  }

  // Marker 받아오기

  return null;
}
