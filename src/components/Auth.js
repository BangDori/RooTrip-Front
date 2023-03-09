import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { socialLogin } from '../services/user';
import { setTokens } from '../utils/auth';

const Auth = () => {
  const navigate = useNavigate();
  const { provider } = useParams();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const getToken = async () => {
      try {
        // 소설 로그인 시 accessToken, refreshToken 저장
        const { status, accessToken, refreshToken, expire } = await socialLogin(
          provider,
          code,
        );

        if (status) setTokens(accessToken, refreshToken, expire);

        navigate('/');
      } catch (err) {
        console.log(err);
      }
    };

    getToken();
  }, [provider, code, navigate]);

  return null;
};

export default Auth;
