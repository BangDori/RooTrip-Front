import { useCallback, useState } from 'react';
import { findOne } from '../services/user';
import {
  regExpName,
  regExpEmail,
  regExpPassword,
  regExpNickname,
} from '../utils/regExp';
import {
  NAME,
  EMAIL,
  NICKNAME,
  PASSWORD,
  CPASSWORD,
  AXIOSERROR,
} from '../utils/registerType';

export function validate({ name, email, nickname, password, cpassword }) {
  let isValid = true;

  // Last Name validation
  if (!regExpName.test(name)) isValid = false;

  // Email validation
  if (!regExpEmail.test(email)) isValid = false;

  // Nickname validation
  if (!regExpNickname.test(nickname)) isValid = false;

  // Password validation
  if (!regExpPassword.test(password)) isValid = false;

  // Confirm Password validation
  if (password !== cpassword) isValid = false;

  return isValid;
}

const useInputValidator = () => {
  const [messages, setMessages] = useState({
    name: '',
    email: '※ 이메일 형식에 맞춰주세요.',
    nickname: '※ 한글, 영어, 숫자를 조합한 닉네임을 입력해주세요.',
    password: '※ 숫자, 영어, 특수문자를 포함해 8~16자리로 입력해주세요.',
    cpassword: '※ 위 입력한 비밀번호를 다시 입력해주세요',
    axiosError: '',
    isValid: false,
  });

  const validateInput = useCallback(
    async (type, data) => {
      let message = '';

      switch (type) {
        case NAME:
          if (!regExpName.test(data)) {
            message = '';
          } else {
            message = '완료';
          }
          break;

        case EMAIL:
          if (!regExpEmail.test(data)) {
            message = '※ 이메일 형식에 맞춰주세요.';
          } else {
            const isDup = await findOne(type, data);

            if (!isDup) {
              message = '중복';
            } else {
              message = '완료';
            }
          }
          break;

        case NICKNAME:
          if (!regExpNickname.test(data)) {
            message = '※ 한글, 영어, 숫자를 조합한 닉네임을 입력해주세요.';
          } else {
            const isDup = await findOne(type, data);

            if (!isDup) {
              message = '중복';
            } else {
              message = '완료';
            }
          }
          break;

        case PASSWORD:
          if (!regExpPassword.test(data)) {
            message =
              '※ 숫자, 영어, 특수문자를 포함해 8~16자리로 입력해주세요.';
          } else {
            message = '완료';
          }
          break;

        case CPASSWORD:
          if (messages.password !== '완료') {
            message = '※ 위 입력한 비밀번호를 다시 입력해주세요';
            break;
          }

          const password = document.querySelector('.password').value;
          if (password !== data) {
            message = '※ 비밀번호가 일치하지 않습니다.';
          } else {
            message = '일치';
          }
          break;

        case AXIOSERROR:
          message = data;
          break;

        default:
          break;
      }

      setMessages({
        ...messages,
        [type]: message,
      });
    },
    [messages],
  );

  return { messages, validateInput };
};

export default useInputValidator;
