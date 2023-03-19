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
      try {
        const accessToken = await socialLogin(provider, code);

        dispatch(issue(accessToken));
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    };

    getToken();
  }, [provider, code, navigate, dispatch]);

  return null;
};

export default Auth;
