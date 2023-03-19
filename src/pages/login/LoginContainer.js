import LoginForm from './loginForm/LoginForm';
import LoginError from './loginForm/LoginError';
import { useCallback, useState } from 'react';
import { login } from '@services/user';
import { USER_LOGIN_FAILED_ERROR } from '@constants/error';
import { useDispatch } from 'react-redux';
import { issue } from '@store/accessToken';

const LoginContainer = () => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  // 로그인 시 발생하는 함수
  const onLogin = useCallback(
    async (loginForm) => {
      try {
        const accessToken = await login(loginForm);
        dispatch(issue(accessToken));
      } catch (e) {
        setError(USER_LOGIN_FAILED_ERROR);
      }
    },
    [dispatch],
  );

  return (
    <>
      <LoginForm onLogin={onLogin} />
      {error && <LoginError error={error} />}
    </>
  );
};

export default LoginContainer;
