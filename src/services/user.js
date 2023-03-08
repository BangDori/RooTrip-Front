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
 * @param {*} form 이름, 닉네임, 이메일, 비밀번호, 비밀번호 확인
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
    // 주소 변경 필요
    const result = await axios
      .post(`${process.env.REACT_APP_SERVER_MAIN}/api/auth/login`, data)
      .then((res) => res.data);

    return result;
  } catch (e) {
    console.log(e);
  }
}

/**
 * auth token 함수
 * @param {*} type refreshType
 * @param {*} token refreshToken
 * @returns accessToken, expire
 */
export async function reIssue(type, token) {
  const data = {
    grant_type: type,
    refresh_token: token,
  };
  try {
    const result = await axios
      .post(`${process.env.REACT_APP_SERVER_MAIN}/api/auth/token/reissue`, data)
      .then((res) => res.data);

    return result;
  } catch (e) {
    console.log(e);
  }
}
