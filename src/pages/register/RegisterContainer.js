import { useCallback, useState } from 'react';
import Register from './Register';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/user';
import { regExpSpace } from '../../utils/regExp';
import { useValidation } from '../../hooks/useValidation';

const RegisterContainer = () => {
  const [form, setForm] = useState({
    name: '강병준',
    email: 'test@naver.com',
    nickname: 'test',
    password: 'test1234!',
    gender: '남자',
  });
  const isValid = useValidation(form);
  const navigate = useNavigate();

  const onInput = useCallback(
    (e) => {
      if (!regExpSpace.test(e.target.value)) {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      }
    },
    [form],
  );

  const onRegister = useCallback(
    async (e, repassword, errorText) => {
      e.preventDefault();

      try {
        if (isValid && form.password === repassword) {
          // const res = await register(form);
          setForm({
            name: '',
            email: '',
            nickname: '',
            password: '',
            gender: '남자',
          });
          navigate('/');
        } else {
          errorText.current.textContent = '입력 정보가 정확하지 않습니다.';
        }
      } catch (e) {
        console.log(e);
      }
    },
    [navigate, isValid, form.password],
  );

  return <Register form={form} onInput={onInput} onRegister={onRegister} />;
};

export default RegisterContainer;
