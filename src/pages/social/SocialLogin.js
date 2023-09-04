import { redirectDocument, json } from 'react-router-dom';

import { socialLoginAPI } from '@services/auth';
import { setTokens } from '@utils/token';

export async function loader({ request, params }) {
  const { provider } = params;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  const response = await socialLoginAPI(provider, code);
  const resData = await response.json();

  // 로그인 오류
  if (!resData.status) {
    throw json({ message: resData.message, link: '/' }, { status: 401 });
  }

  // 로그인 성공
  const { accessToken, refreshToken, expire } = resData.data;
  setTokens(accessToken, refreshToken, expire);

  return redirectDocument('/trip');
}
