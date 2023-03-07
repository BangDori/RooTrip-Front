import { useCallback, useState } from 'react';
import Register from './Register';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/user';
import { regExpSpace } from '../../utils/regExp';
import useInputValidator, { validate } from '../../hooks/useInputValidator';

const RegisterContainer = () => {
  const { messages, validateInput } = useInputValidator();
  const [form, setForm] = useState({
    name: '',
    gender: 'M',
    email: '',
    nickname: '',
    password: '',
    cpassword: '',
  });
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

  const onCheck = useCallback(
    async (type, data) => {
      await validateInput(type, data);
    },
    [validateInput],
  );

  const onRegister = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        if (validate(messages)) {
          delete form.cpassword;
          await register(form);

          setForm({
            name: '',
            email: '',
            nickname: '',
            password: '',
            gender: 'M',
          });
          navigate('/');
        }
      } catch (e) {
        console.log(e);
      }
    },
    [navigate, form, messages],
  );

  return (
    <Register
      form={form}
      messages={messages}
      onInput={onInput}
      onCheck={onCheck}
      onRegister={onRegister}
    />
  );
};

export default RegisterContainer;
