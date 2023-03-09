import axios from 'axios';

/**
 * auth findOne 함수
 * @param {*} type 입력 타입
 * @param {*} data 입력 쿼리
 * @returns
 */
export async function findOne(type, data) {
  try {
    const status = await axios
      .get(
        `${process.env.REACT_APP_SERVER_MAIN}/api/auth/check?type=${type}&data=${data}`,
      )
      .then((result) => result.data);

    return status;
  } catch (e) {
    console.log(e);
  }
}

/**
 * auth register 함수
 * @param {*} form 이름, 닉네임, 이메일, 비밀번호
 * @returns
 */
export async function register(data) {
  try {
    await axios
      .post(`${process.env.REACT_APP_SERVER_MAIN}/api/auth/register`, data)
      .then((result) => {
        if (result.data.status) {
          return result.data.status;
        } else {
          throw new Error(result.data.message);
        }
      });
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * auth login 함수
 * @param {*} form 이메일, 비밀번호
 * @returns accessToken, refreshToken
 */
export async function login(data) {
  try {
    const result = await axios
      .post(`${process.env.REACT_APP_SERVER_MAIN}/api/auth/login`, data)
      .then((res) => res.data);

    return result;
  } catch (e) {
    console.log(e);
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
    const result = await axios
      .post('http://165.229.86.126:8000/api/auth/social', {
        provider,
        code,
      })
      .then((res) => res.data);

    return result;
  } catch (e) {
    console.log(e);
  }
}

/**
 * auth token 재발급 함수
 * @param {*} type refreshType
 * @param {*} token refreshToken
 * @returns accessToken, expire
 */
export async function reIssue(grant_type, refresh_token) {
  try {
    const result = await axios
      .post(`${process.env.REACT_APP_SERVER_MAIN}/api/auth/token/reissue`, {
        grant_type,
        refresh_token,
      })
      .then((res) => res.data);

    return result;
  } catch (e) {
    console.log(e);
  }
}
