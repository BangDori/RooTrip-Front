import React from 'react';
import { Link } from 'react-router-dom';

const SocialLogin = () => {
  return (
    <div className='social_login'>
      <Link to={process.env.REACT_APP_KAKAO_AUTH_URL} state={{ type: 'kakao' }}>
        <button className='kakaobtn'>카카오톡 로그인</button>
      </Link>
      <Link to={process.env.REACT_APP_NAVER_AUTH_URL} state={{ type: 'naver' }}>
        <button className='naverbtn'>네이버 로그인</button>
      </Link>
      <Link
        to={process.env.REACT_APP_GOOGLE_AUTH_URL}
        state={{ type: 'google' }}
      >
        <button className='googlebtn'>구글 로그인</button>
      </Link>
    </div>
  );
};

export default SocialLogin;
