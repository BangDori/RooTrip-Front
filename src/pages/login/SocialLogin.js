import React from 'react';
import loadable from '@loadable/component';
import { Link } from 'react-router-dom';

const Auth = loadable(() => import('../../components/Auth'));

const SocialLogin = () => {
  const onAuthLoad = () => Auth.preload();

  return (
    <div className='social_login'>
      <Link
        to={process.env.REACT_APP_KAKAO_AUTH_URL}
        state={{ type: 'kakao' }}
        onMouseEnter={onAuthLoad}
      >
        <button className='kakaobtn'>카카오톡 로그인</button>
      </Link>
      <Link
        to={process.env.REACT_APP_NAVER_AUTH_URL}
        state={{ type: 'naver' }}
        onMouseEnter={onAuthLoad}
      >
        <button className='naverbtn'>네이버 로그인</button>
      </Link>
      <Link
        to={process.env.REACT_APP_GOOGLE_AUTH_URL}
        state={{ type: 'google' }}
        onMouseEnter={onAuthLoad}
      >
        <button className='googlebtn'>구글 로그인</button>
      </Link>
    </div>
  );
};

export default SocialLogin;
