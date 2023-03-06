/**
 * 이름, 이메일, 닉네임, 비밀번호, 공백 체크를 위한 정규표현식
 */
const regExpName = /^[가-힣]{2,}$/;
const regExpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regExpNickname = /^[A-Za-z\dㄱ-ㅎㅏ-ㅣ가-힣].{2,}$/; // nickname
const regExpPassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/;
const regExpSpace = /\s/;

export { regExpName, regExpEmail, regExpPassword, regExpNickname, regExpSpace };
