import { useCallback, useState } from 'react';
import Register from '@pages/register/Register';
import { useNavigate } from 'react-router-dom';
import { register } from '@services/user';
import { regExpSpace } from '@constants/regExp';
import useInputValidator, { validate } from '@hooks/useInputValidator';
import { useInitialState } from '@hooks/useInitialState';
import TOC from '@pages/register/TOC';
import Assign from '@pages/register/Assign';

const RegisterContainer = () => {
  const { messages, validateInput } = useInputValidator();
  const [form, setForm, resetForm] = useInitialState({
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
    [form, setForm],
  );

  const onCheck = useCallback(
    async (type, data) => await validateInput(type, data),
    [validateInput],
  );

  const onRegister = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        if (validate(form)) {
          delete form.cpassword;
          await register(form);

          resetForm();
          navigate('/register/certification');
        }
      } catch (e) {
        await validateInput('axiosError', e.message);
      }
    },
    [navigate, form, validateInput, resetForm],
  );

  return (
    <form className='Register_main' onSubmit={onRegister}>
      <div className='User_data'>
        <TOC />
        <Register
          form={form}
          messages={messages}
          onInput={onInput}
          onCheck={onCheck}
        />
      </div>

      <Assign onRegister={onRegister} />
    </form>
  );
};

export default RegisterContainer;
