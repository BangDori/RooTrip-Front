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
    async (e) => {
      e.preventDefault();

      try {
        console.log('유효성 검증: ', isValid);
        if (isValid) {
          // const res = await register(form);

          if (false) {
            navigate('/');
            setForm({
              name: '',
              email: '',
              nickname: '',
              password: '',
              gender: '남자',
            });
          }
        } else {
          console.log('유효하지 않습니다');
        }
      } catch (e) {
        console.log(e);
      }
    },
    [navigate, isValid],
  );

  return <Register form={form} onInput={onInput} onRegister={onRegister} />;
};

export default RegisterContainer;
