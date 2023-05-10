import axios from 'axios';
import { MAIN_SERVER } from '@config/setting';

/**
 * 회원가입
 * @param {*} form 이름, 닉네임, 이메일, 비밀번호
 * @returns message (message or Error)
 */
export async function register(data) {
  try {
    const { status, message } = await axios
      .post(`${MAIN_SERVER}/api/auth/register`, data)
      .then((res) => res.data);

    return status ? null : new Error(message);
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * accessToken 재발급
 * @param {*} refreshToken client 측의 refreshToken
 * @returns message (message or Error)
 */
export async function reIssue(refreshToken) {
  try {
    const { status, accessToken, expire, message } = await axios
      .post(`${MAIN_SERVER}/api/auth/token/reissue`, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      })
      .then((res) => res.data);

    return status ? { accessToken, expire } : new Error(message);
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * 이메일, 닉네임 중복 체크
 * @param {*} type 중복 확인할 타입
 * @param {*} data 입력한 값
 * @returns message (message or Error)
 */
export async function findOne(type, data) {
  try {
    const { status, message } = await axios
      .get(`${MAIN_SERVER}/api/auth/check?type=${type}&data=${data}`)
      .then((res) => res.data);

    return status ? null : new Error(message);
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * 로그아웃
 * @param {*} accessToken client 측의 accessToken
 * @returns message (message or Error)
 */
export async function logout(accessToken) {
  try {
    const { status, message } = await axios
      .post(`${MAIN_SERVER}/api/auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);

    return status ? null : new Error(message);
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * 로그인
 * @param {*} form 이메일, 비밀번호
 * @returns message (message or Error)
 */
export async function login(loginForm) {
  try {
    const { status, accessToken, refreshToken, expire, message } = await axios
      .post(`${MAIN_SERVER}/api/auth/login`, loginForm)
      .then((res) => res.data);

    return status ? { accessToken, expire, refreshToken } : new Error(message);
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * 소셜 로그인 (카카오톡, 네이버, 구글)
 * @param {*} provider 소셜 제공자
 * @param {*} code 로그인 코드
 * @returns accessToken, refreshToken, expire
 */
export async function socialLogin(provider, code) {
  try {
    const { status, accessToken, refreshToken, expire, message } = await axios
      .post(`${MAIN_SERVER}/api/auth/social`, {
        provider,
        code,
      })
      .then((res) => res.data);

    return status ? { accessToken, expire, refreshToken } : new Error(message);
  } catch (e) {
    throw new Error(e.message);
  }
}
