import Cookies from 'js-cookie';
import { redirectDocument } from 'react-router-dom';
import { logoutAPI } from '@services/auth';

export async function loader() {
  await logoutAPI();
  Cookies.remove('accesstoken');
  Cookies.remove('refreshtoken');
  Cookies.remove('expiration');

  return redirectDocument('/');
}
