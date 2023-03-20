import React from 'react';
import loadable from '@loadable/component';
import { Link } from 'react-router-dom';
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from '@config/auth';

const SocialAuth = loadable(() => import('@components/SocialAuth'));

const LoginSocial = () => {
  const onAuthLoad = () => SocialAuth.preload();

  return (
    <div className='social_login'>
      <Link
        to={KAKAO_AUTH_URL}
        state={{ type: 'kakao' }}
        onMouseEnter={onAuthLoad}
      >
        <button className='kakaobtn'>카카오톡 로그인</button>
      </Link>
      <Link
        to={NAVER_AUTH_URL}
        state={{ type: 'naver' }}
        onMouseEnter={onAuthLoad}
      >
        <button className='naverbtn'>네이버 로그인</button>
      </Link>
      <Link
        to={GOOGLE_AUTH_URL}
        state={{ type: 'google' }}
        onMouseEnter={onAuthLoad}
      >
        <button className='googlebtn'>구글 로그인</button>
      </Link>
    </div>
  );
};

export default LoginSocial;
