import React from 'react';
import { Link } from 'react-router-dom';
import loadable from '@loadable/component';

const Register = loadable(() => import('@pages/register/Index'));

const LoginButton = () => {
  return (
    <div className='login_buttons'>
      <button type='submit' className='loginbtn'>
        로그인
      </button>

      <Link to='/register' onMouseEnter={() => Register.preload()}>
        <button type='button' className='gosignupbtn'>
          회원 가입
        </button>
      </Link>
    </div>
  );
};

export default LoginButton;
