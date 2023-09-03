import Cookies from 'js-cookie';
import { json } from 'react-router-dom';

/**
 * 토큰의 잔여 시간을 받아오기 위한 함수
 * @returns 잔여 시간
 */
export function getTokenDuration() {
  const storedExpirationDate = Cookies.get('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

/**
 * 토큰을 받아오는 함수
 * @returns 토큰
 */
export function getAuthToken() {
  const accesstoken = Cookies.get('accesstoken');

  if (!accesstoken) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return accesstoken;
}

/**
 * 토큰을 반환해주는 Loader
 * @returns 토큰
 */
export function tokenLoader() {
  const token = getAuthToken();

  return token;
}

/**
 * 토큰이 없는 경우 로그인 페이지로 이동시키기 위한 Loader
 * @returns 로그인페이지로 이동
 */
export async function restrictAccessWithNoToken() {
  const token = getAuthToken();

  if (!token) {
    throw json(
      {
        message: '로그인 후 이용해주세요.',
        link: '/',
      },
      { status: 401 },
    );
  }

  return null;
}

/**
 * 토큰이 있는 경우 접근을 제한하기 위한 Loader
 * @returns 에러 요청
 */
export function restrictAccessWithToken() {
  const token = getAuthToken();

  // 토큰이 존재할 경우 Error
  if (token) {
    throw json(
      {
        message: '요청한 페이지를 찾을 수 없습니다.',
        link: '/trip',
      },
      { status: 404 },
    );
  }

  return null;
}

/**
 * 토큰 저장
 * @param {String} accesstoken
 * @param {String} refreshtoken
 * @param {Number} expire 만료 시간
 */
export function setTokens(accesstoken, refreshtoken, expire) {
  const now = new Date();
  const expiration = new Date(now.getTime() + expire * 1000);

  Cookies.set('accesstoken', accesstoken);
  Cookies.set('refreshtoken', refreshtoken);
  Cookies.set('expiration', expiration.toISOString());
}
