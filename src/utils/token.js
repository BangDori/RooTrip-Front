import { json, redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import store from '@store/configureStore';

/**
 * refreshtoken 반환
 * @returns refreshtoken or undefined
 */
export function getRefreshToken() {
  return Cookies.get('refreshtoken');
}

/**
 * 토큰의 잔여 시간을 받아오기 위한 함수
 * @returns 잔여 시간
 */
export function getTokenDuration(expiration) {
  const now = new Date();
  const duration = expiration - now.getTime();

  return duration;
}

/**
 * 토큰을 받아오는 함수
 * @returns 토큰
 */
export function getAuthToken() {
  const { user } = store.getState();
  const { accessToken: accesstoken, expiration } = user;

  const tokenDuration = getTokenDuration(expiration);
  return { accesstoken, expiration: tokenDuration };
}

/**
 * 토큰이 없는 경우 로그인 페이지로 이동시키기 위한 Loader
 * @returns 로그인페이지로 이동
 */
export async function restrictAccessWithNoToken() {
  const { accesstoken } = getAuthToken();

  if (!accesstoken) {
    return redirect('/');
  }

  return null;
}

/**
 * 토큰이 있는 경우 접근을 제한하기 위한 Loader
 * @returns 에러 요청
 */
export function restrictAccessWithToken() {
  const { accesstoken } = getAuthToken();

  // 토큰이 존재할 경우 Error
  if (accesstoken) {
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
 * refreshtoken 저장
 * @param {String} refreshtoken
 */
export function setRefreshToken(refreshtoken) {
  Cookies.set('refreshtoken', refreshtoken);
}

/**
 * 만료 시간 변환
 * @param {Number} expire
 * @returns 만료 시간
 */
export function getExpiration(expire) {
  const now = new Date();
  const expiration = new Date(now.getTime() + expire * 1000).getTime();

  return expiration;
}
