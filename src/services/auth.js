import { json } from 'react-router-dom';
import { MAIN_SERVER } from '@config/server-config';

/**
 * API 요청 Interface
 * @param {String} url 통신 URI
 * @param {String} method HTTP Method
 * @param {Object} data 입력 데이터
 * @returns 응답 객체
 */
export async function authAPI(url, method, data) {
  try {
    const response = await fetch(MAIN_SERVER + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    throw json({ message: error.message }, { status: error.status });
  }
}

/**
 * 로그인 API
 * @param {Object} loginForm
 * @returns 응답
 */
const loginAPI = async (loginForm) => {
  const response = await authAPI('/api/auth/login', 'POST', loginForm);

  return response;
};

/**
 * 소셜로그인 API
 * @param {String} provider 제공자
 * @param {String} code 코드
 * @returns
 */
const socialLoginAPI = async (provider, code) => {
  const response = await authAPI('/api/auth/social', 'POST', {
    provider,
    code,
  });

  return response;
};

/**
 * 토큰 재발급 API
 * @param {Object} reIssueForm
 * @returns 응답
 */
const reIssueAPI = async (reIssueForm) => {
  const response = await authAPI(
    '/api/auth/token/reissue',
    'POST',
    reIssueForm,
  );

  return response;
};

/**
 * 로그아웃 API
 */
const logoutAPI = async () => {
  await authAPI('/api/auth/logout');
};

export { loginAPI, socialLoginAPI, reIssueAPI, logoutAPI };
