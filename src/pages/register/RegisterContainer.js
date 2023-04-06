import RegisterForm from './registerForm/RegisterForm';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '@services/user';

const RegisterContainer = () => {
  const navigate = useNavigate();

  const onRegister = useCallback(
    async (registerForm) => {
      try {
        await register(registerForm);
        navigate('/');
      } catch (e) {
        alert(e.message);
      }
    },
    [navigate],
  );

  return <RegisterForm onRegister={onRegister} />;
};

export default RegisterContainer;
