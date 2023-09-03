import { Link } from 'react-router-dom';

import kakaoIcon from '@assets/kakao-icon.png';
import naverIcon from '@assets/naver-icon.png';
import { NAVER_AUTH_URL, KAKAO_AUTH_URL } from '@config/auth-config';
import '@styles/login/LoginNavigation.scss';

const LoginNavigation = () => {
  return (
    <>
      <p>
        <Link to='auth/account'>비밀번호를 잊으셨나요?</Link>
      </p>

      <div className='social-container'>
        <Link to={NAVER_AUTH_URL}>
          <img src={naverIcon} alt='naver icon' />
        </Link>
        <Link to={KAKAO_AUTH_URL}>
          <img src={kakaoIcon} alt='kakao icon' />
        </Link>
      </div>

      <div className='divider'>
        <p>또는</p>
      </div>

      <p>
        계정이 없으신가요? <Link to='auth/signup'>회원가입</Link>
      </p>
    </>
  );
};

export default LoginNavigation;
