import React from 'react';
import loadable from '@loadable/component';
import { Link } from 'react-router-dom';
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from '@config/auth';
import naver from '@assets/naver.png';
import kakao from '@assets/kakao.png';
import google from '@assets/google.png';

const SocialAuth = loadable(() => import('@components/common/SocialAuth'));

const LoginSocial = () => {
  const onAuthLoad = () => SocialAuth.preload();

  return (
    <div className='social_login'>
      <Link
        to={KAKAO_AUTH_URL}
        state={{ type: 'kakao' }}
        onMouseEnter={onAuthLoad}
      >
        <button className='kakaobtn'>
          <img className='Login_logo' src={kakao} alt='카카오 로그인 버튼' />
        </button>
      </Link>
      <Link
        to={NAVER_AUTH_URL}
        state={{ type: 'naver' }}
        onMouseEnter={onAuthLoad}
      >
        <button className='naverbtn'>
          <img className='Login_logo' src={naver} alt='네이버 로그인 버튼' />
        </button>
      </Link>
      <Link
        to={GOOGLE_AUTH_URL}
        state={{ type: 'google' }}
        onMouseEnter={onAuthLoad}
      >
        <button className='googlebtn'>
          <img className='Login_logo' src={google} alt='구글 로그인 버튼' />
        </button>
      </Link>
    </div>
  );
};

export default LoginSocial;
