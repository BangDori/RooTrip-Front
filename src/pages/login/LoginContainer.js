import { useCallback, useState } from 'react';
import { login } from '@services/auth';
import { useDispatch } from 'react-redux';
import { issue } from '@store/accessToken';
import { setRefreshToken } from '@utils/authCookie';
import LoginForm from './loginForm/LoginForm';
import LoginError from './loginForm/LoginError';

const LoginContainer = () => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  // 로그인 시 발생하는 함수
  const onLogin = useCallback(
    async (loginForm) => {
      try {
        const token = await login(loginForm);
        const { accessToken, expire, refreshToken } = token;

        setRefreshToken(refreshToken);
        dispatch(issue({ accessToken, expire }));
      } catch (e) {
        setError(e.message);
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
