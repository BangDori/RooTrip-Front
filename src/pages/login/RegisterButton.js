import React from 'react';
import { Link } from 'react-router-dom';
import loadable from '@loadable/component';

const Register = loadable(() => import('@pages/register/Index'));

const RegisterButton = () => {
  return (
    <div className='register-box'>
      <span>계정이 없으신가요?</span>

      <Link to='/register' onMouseEnter={() => Register.preload()}>
        <button type='button' className='gosignupbtn'>
          회원 가입
        </button>
      </Link>
    </div>
  );
};

export default RegisterButton;
