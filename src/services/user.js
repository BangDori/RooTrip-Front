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
      url: `${process.env.REACT_APP_SERVER}/api/auth/login`,
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
    const res = await axios({
      url: `${process.env.REACT_APP_SERVER}/api/auth/register`,
      method: 'post',
      data: form,
    });

    console.log(res);
  } catch (e) {
    console.log(e);
  }
}
