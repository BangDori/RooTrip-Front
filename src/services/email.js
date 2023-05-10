import axios from 'axios';
import { MAIN_SERVER } from '@config/setting';

/**
 * 이메일 인증 코드 전송 함수
 * @param {*} email 이메일
 */
export async function sendVerifyNumber(email) {
  try {
    const data = await axios
      .post(`${MAIN_SERVER}/api/email/verify/send`, { email })
      .then((res) => res.data);

    return data;
  } catch (e) {
    return e;
  }
}

/**
 * 이메일 인증 코드 검증 함수
 * @param {*} value 이메일 인증 코드
 */
export async function authVerifyNumber(email, verifyNumber) {
  try {
    const data = await axios
      .post(`${MAIN_SERVER}/api/email/verify/auth`, {
        email,
        verifyNumber,
      })
      .then((result) => result.data);

    return data;
  } catch (e) {
    return e;
  }
}

/**
 * auth 임시 비밀번호 발급 함수
 * @param {*} email 이메일, 인증 번호
 * @returns
 */
export async function sendPassword(email, verifyNumber) {
  try {
    const { status, message } = await axios
      .post(`${MAIN_SERVER}/api/email/resetpassword`, {
        email,
        verifyNumber,
      })
      .then((res) => res.data);

    return status ? null : new Error(message);
  } catch (e) {
    throw new Error(e.message);
  }
}
