// 회원가입 테이블
const registerTable = [
  {
    id: 1,
    name: '이름',
  },
  {
    id: 2,
    name: '이메일',
    classname: 'email_check',
  },
  {
    id: 3,
    name: '이메일 인증',
  },
  {
    id: 4,
    name: '닉네임',
  },
  {
    id: 5,
    name: '비밀번호',
  },
  {
    id: 6,
    name: '비밀번호 확인',
  },
];

// 계정 찾기 테이블
const accountTable = [
  {
    id: 1,
    name: '이메일 인증',
  },
  {
    id: 2,
    name: '인증번호',
  },
];

export { registerTable, accountTable };
