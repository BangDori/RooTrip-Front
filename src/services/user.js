import axios from 'axios';

/**
 * auth login 담당 함수
 * @param {*} form 유저 아이디와 비밀번호
 * @returns accessToken, refreshToken 혹은 에러메시지
 */
export async function login(form) {
  try {
    // 주소 변경 필요
    const res = await axios({
      url: 'http://localhost:4000/users',
      method: 'post',
      data: form,
    });

    return res;
  } catch (e) {
    return e;
  }
}
