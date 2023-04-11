import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { socialLogin } from '@services/user';
import { useDispatch } from 'react-redux';
import { issue } from '@store/accessToken';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { provider } = useParams();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const getToken = async () => {
      const accessToken = await socialLogin(provider, code);

      if (accessToken) {
        dispatch(issue(accessToken));
        navigate('/');
      }
    };

    getToken();

    // 의존성 배열을 제거함으로써 두 번 발생하는 에러 해결
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Auth;
