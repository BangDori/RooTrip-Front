import { useCallback, useState } from 'react';
import { findOne } from '@services/user';
import {
  regExpName,
  regExpEmail,
  regExpPassword,
  regExpNickname,
} from '@constants/regExp';
import {
  NAME,
  EMAIL,
  NICKNAME,
  PASSWORD,
  CPASSWORD,
} from '@constants/registerType';

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
    email: '※ 이메일 형식에 맞춰주세요.',
    nickname: '※ 한글, 영어, 숫자를 조합한 닉네임을 입력해주세요.',
    password: '※ 숫자, 영어, 특수문자를 포함해 8~16자리로 입력해주세요.',
    cpassword: '※ 위 입력한 비밀번호를 다시 입력해주세요',
    isValid: false,
  });
  const [prevData, setPrevData] = useState({
    email: '',
    nickname: '',
  });

  const validateInput = useCallback(
    async (type, data) => {
      let message = '';

      switch (type) {
        case EMAIL:
        case NICKNAME:
          if (
            (type === EMAIL && !regExpEmail.test(data)) ||
            (type === NICKNAME && !regExpNickname.test(data))
          ) {
            message =
              type === EMAIL
                ? '※ 이메일 형식에 맞춰주세요.'
                : '※ 한글, 영어, 숫자를 조합한 닉네임을 입력해주세요.';
          } else {
            if (data === prevData[type]) return;
            setPrevData((prevData) => ({
              ...prevData,
              [type]: data,
            }));
            const isDup = await findOne(type, data);

            if (!isDup) message = '중복';
          }
          break;

        case PASSWORD:
          if (!regExpPassword.test(data))
            message =
              '※ 숫자, 영어, 특수문자를 포함해 8~16자리로 입력해주세요.';
          break;

        case CPASSWORD:
          const password = document.querySelector('.password').value;
          if (password !== data) message = '※ 비밀번호가 일치하지 않습니다.';
          break;

        default:
          break;
      }

      setMessages((messages) => ({
        ...messages,
        [type]: message,
      }));
    },
    [prevData],
  );

  return { messages, validateInput };
};

export default useInputValidator;
