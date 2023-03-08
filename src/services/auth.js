import Cookies from 'js-cookie';

// accessToken을 쿠키에 저장하는 함수
function setAccessToken(token, minutes) {
  Cookies.set('accessToken', token, { expires: (1 / 1440) * minutes });
}

// refreshToken을 쿠키에 저장하는 함수
// session cookie 브라우저가 닫히면 만료
function setRefreshToken(token) {
  Cookies.set('refreshToken', token);
}

// accessToken을 쿠키에서 가져오는 함수
function getAccessToken() {
  return Cookies.get('accessToken');
}

// refreshToken을 쿠키에서 가져오는 함수
function getRefreshToken() {
  return Cookies.get('refreshToken');
}

// refreshToken을 쿠키에서 삭제하는 함수
function removeRefreshToken() {
  Cookies.remove('refreshToken');
}

export {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
  removeRefreshToken,
};
