import Cookies from 'js-cookie';

// 로그인 시 호출
// accessToken, refreshToken 저장
export function setTokens(accessToken, refreshToken, minutes) {
  Cookies.set('accessToken', accessToken, { expires: (1 / 1440) * minutes });
  Cookies.set('refreshToken', refreshToken);
}

// accessToken을 쿠키에 저장하는 함수
export function setAccessToken(token, minutes) {
  Cookies.set('accessToken', token, { expires: (1 / 1440) * minutes });
}

// refreshToken을 쿠키에 저장하는 함수
// session cookie 브라우저가 닫히면 만료
export function setRefreshToken(token) {
  Cookies.set('refreshToken', token);
}

// accessToken을 쿠키에서 가져오는 함수
export function getAccessToken() {
  return Cookies.get('accessToken');
}

// refreshToken을 쿠키에서 가져오는 함수
export function getRefreshToken() {
  return Cookies.get('refreshToken');
}

// 로그아웃 시 호출
// accessToken, refreshToken 제거
export function removeTokens() {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
}

export function removeAccessToken() {
  Cookies.remove('accessToken');
}

// refreshToken을 쿠키에서 삭제하는 함수
export function removeRefreshToken() {
  Cookies.remove('refreshToken');
}
