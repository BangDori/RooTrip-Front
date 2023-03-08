import Login from './Login';
import { useCallback, useState } from 'react';
import { login } from '../../services/user';
import { regExpSpace } from '../../constants/regExp';
import { useInitialState } from '../../hooks/useInitialState';
import { setAccessToken, setRefreshToken } from '../../utils/auth';

const LoginContainer = () => {
  const [form, setForm, resetForm] = useInitialState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

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

  const onLogin = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const { status, accessToken, refreshToken, expire } = await login(form);

        if (status) {
          // 최초 로그인 시 accessToken, refreshToken 저장
          setAccessToken(accessToken, expire);
          setRefreshToken(refreshToken);

          setError('');
          window.location.reload();
        } else {
          throw new Error('유저 정보가 일치하지 않습니다.');
        }

        resetForm();
      } catch (e) {
        setError(e.message);
      }
    },
    [form, resetForm],
  );

  return (
    <Login form={form} onInput={onInput} onLogin={onLogin} error={error} />
  );
};

export default LoginContainer;
