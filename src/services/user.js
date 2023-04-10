import axios from 'axios';
import { MAIN_SERVER } from '@config/setting';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setTokens,
  removeTokens,
} from '@utils/authCookie';
import {
  USER_LOGIN_FAILED_ERROR,
  USER_SOCIAL_LOGIN_FAILED_ERROR,
  USER_LOGOUT_FAILED_ERROR,
  TOKEN_REISSUE_ERROR,
  EMAIL_SEND_FAILURE,
} from '@constants/error';

/**
 * auth findOne 함수
 * @param {*} type 입력 타입
 * @param {*} data 입력 쿼리
 * @returns
 */
export async function findOne(type, data) {
  try {
    const status = await axios
      .get(`${MAIN_SERVER}/api/auth/check?type=${type}&data=${data}`)
      .then((result) => result.data);

    return status;
  } catch (e) {
    return e;
  }
}

/**
 * 이메일 인증 코드 전송 함수
 * @param {*} email 이메일
 */
export async function sendVerifyNumber(email) {
  try {
    const data = await axios
      .post(`${MAIN_SERVER}/api/email/verify/send`, { email })
      .then((result) => result.data);

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
 * auth register 함수
 * @param {*} form 이름, 닉네임, 이메일, 비밀번호
 * @returns 회원가입 여부 or 에러메시지
 */
export async function register(data) {
  try {
    await axios
      .post(`${MAIN_SERVER}/api/auth/register`, data)
      .then((result) => {
        if (result.data.status) {
          return result.data.status;
        }

        throw new Error(result.data.message);
      });
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * auth login 함수
 * @param {*} form (이메일, 비밀번호)
 * @returns accessToken, refreshToken
 */
export async function login(data) {
  try {
    const response = await axios.post(`${MAIN_SERVER}/api/auth/login`, data);
    const { status, accessToken, refreshToken, expire } = response.data;

    // 로그인에 성공했다면
    if (status) {
      // (accessToken, expire)과 refreshToken 저장
      setTokens(accessToken, refreshToken, expire);
      return accessToken;
    }

    // 로그인에 실패했다면
    throw new Error(USER_LOGIN_FAILED_ERROR);
  } catch (e) {
    throw new Error(USER_LOGIN_FAILED_ERROR);
  }
}

/**
 * auth social login 함수
 * @param {*} provider 소셜 제공자
 * @param {*} code 로그인 코드
 * @returns accessToken, refreshToken, expire
 */
export async function socialLogin(provider, code) {
  try {
    const response = await axios
      .post(`${MAIN_SERVER}/api/auth/social`, {
        provider,
        code,
      })
      .then((res) => res.data);
    const { status, accessToken, refreshToken, expire } = response;

    // 소셜 로그인에 성공했다면
    if (status) {
      // (accessToken, expire)과 refreshToken 저장
      setTokens(accessToken, refreshToken, expire);
      return accessToken;
    }

    // 소셜 로그인에 실패했다면
    throw new Error(USER_SOCIAL_LOGIN_FAILED_ERROR);
  } catch (e) {
    throw new Error(USER_SOCIAL_LOGIN_FAILED_ERROR);
  }
}

/**
 * auth 임시 비밀번호 발급 함수
 * @param {*} email 이메일, 인증 번호
 * @returns
 */
export async function sendPassword(email, verifyNumber) {
  try {
    const status = await axios
      .post(`${MAIN_SERVER}/api/email/resetpassword`, {
        email,
        verifyNumber,
      })
      .then((res) => res.data);

    if (!status) {
      throw new Error(EMAIL_SEND_FAILURE);
    }

    return status;
  } catch (e) {
    throw new Error(EMAIL_SEND_FAILURE);
  }
}

/**
 * auth token 재발급 함수
 * @returns accessToken, expire
 */
export async function reIssue() {
  try {
    // client 측의 refreshToken 가져오기
    const refreshToken = getRefreshToken();
    const response = await axios
      .post(`${MAIN_SERVER}/api/auth/token/reissue`, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      })
      .then((res) => res.data);
    const { accessToken, expire } = response;

    // 재발급에 성공하였다면
    if (accessToken) {
      // accessToken을 만료시간과 함께 쿠키에 저장
      setAccessToken(accessToken, expire);
      return { accessToken, expire };
    }

    throw new Error(TOKEN_REISSUE_ERROR);
  } catch (e) {
    // 401(인증 오류)이 발생한 경우
    if (e.response.status === 401) {
      window.location = '/';
    }

    throw new Error(TOKEN_REISSUE_ERROR);
  }
}

/**
 * auth logout 함수
 */
export async function logout() {
  try {
    // client 측의 accessToken 가져오기
    const accessToken = getAccessToken();

    const response = await axios
      .post(`${MAIN_SERVER}/api/auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);

    // 로그아웃이 성공하였다면
    if (response) {
      // accessToken과 refreshToken 제거
      removeTokens();
      return;
    }

    throw new Error(USER_LOGOUT_FAILED_ERROR);
  } catch (e) {
    // 401(인증 오류)이 발생한 경우
    if (e.response.status === 401) {
      window.location = '/';
    }

    throw new Error(USER_LOGOUT_FAILED_ERROR);
  }
}
