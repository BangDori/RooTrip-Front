import axios from 'axios';

/**
 * auth login 함수
 * @param {*} form 이메일, 비밀번호
 * @returns accessToken, refreshToken
 */
export async function login(form) {
  try {
    // 주소 변경 필요
    const data = await axios({
      url: `${process.env.REACT_APP_SERVER_SUB}/api/auth/login`,
      method: 'post',
      data: form,
    }).then((res) => res.data);

    return data;
  } catch (e) {
    console.log(e);
  }
}

/**
 * auth register 함수
 * @param {*} form 이름, 닉네임, 이메일, 비밀번호, 비밀번호 확인
 * @returns
 */
export async function register(form) {
  try {
    await axios({
      url: `${process.env.REACT_APP_SERVER_SUB}/api/auth/register`,
      method: 'post',
      data: form,
    }).then((result) => {
      console.log(result);
      if (result.data.status) {
        return result.data.status;
      } else {
        throw new Error(result.data.message);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

/**
 * auth findOne 함수
 * @param {*} type 입력 타입
 * @param {*} data 입력 쿼리
 * @returns
 */
export async function findOne(type, data) {
  try {
    const status = await axios({
      url: `${process.env.REACT_APP_SERVER_SUB}/api/auth/check?type=${type}&data=${data}`,
      method: 'get',
      responseType: 'json',
    }).then((result) => result.data);

    return status;
  } catch (e) {
    console.log(e);
  }
}
