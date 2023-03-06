import { useEffect, useState } from 'react';
import {
  regExpName,
  regExpEmail,
  regExpPassword,
  regExpNickname,
} from '../utils/regExp';

// 입력한 데이터에 대한 검증 함수
const validateData = (form) => {
  return new Promise((resolve, reject) => {
    const { name, email, nickname, password } = form;

    // 각각의 데이터에 대한 검증 수행
    const isValidName = regExpName.test(name);
    const isValidEmail = regExpEmail.test(email);
    const isValidNickname = regExpNickname.test(nickname);
    const isValidPassword = regExpPassword.test(password);

    // 검증 결과에 따라 true/false 반환
    resolve(isValidName && isValidEmail && isValidNickname && isValidPassword);
  });
};

// 커스텀 훅
export const useValidation = (form) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const handleValidation = async () => {
      const isValidData = await validateData(form); // 입력한 데이터에 대한 검증 수행
      setIsValid(isValidData);
    };

    handleValidation();
  }, [form]);

  return isValid;
};
