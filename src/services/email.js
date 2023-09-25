import { json } from 'react-router-dom';
import { MAIN_SERVER } from '@config/server-config';

const EMAIL_API_SERVER = `${MAIN_SERVER}/api/email`;

/**
 * API 요청 Interface
 * @param {String} url 통신 URI
 * @param {String} method HTTP Method
 * @param {Object} data 입력 데이터
 * @returns 응답 객체
 */
export async function emailAPI(url, method, data) {
  try {
    const response = await fetch(EMAIL_API_SERVER + url, {
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
 * 인증번호 전송 API
 * @param {Object} email
 * @returns 응답
 */
const sendVerifyNumberAPI = async (email) => {
  const response = emailAPI('/verify/send', 'POST', { email });

  return response;
};
/**
 * 비밀번호 초기화 API
 * @param {Object} accountForm
 * @returns 응답
 */
const resetPasswordAPI = async (accountForm) => {
  const response = emailAPI('/resetPassword', 'POST', accountForm);

  return response;
};

export { sendVerifyNumberAPI, resetPasswordAPI };
