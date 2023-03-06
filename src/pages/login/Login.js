import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ form, onInput, onLogin }) => {
  const { email, password } = form;
  const errorText = useRef(null);

  return (
    <form
      className='login_index'
      method='post'
      onSubmit={(e) => onLogin(e, errorText)}
    >
      <input
        className='logintext'
        name='email'
        value={email}
        placeholder='사용자 이메일 또는 아이디'
        onChange={onInput}
      />
      <input
        className='logintext'
        name='password'
        value={password}
        placeholder='비밀번호'
        onChange={onInput}
      />
      <button type='submit' className='loginbtn'>
        로그인
      </button>
      <Link to='/register'>
        <button type='button' className='gosignupbtn'>
          회원 가입
        </button>
      </Link>
      <p ref={errorText}></p>
    </form>
  );
};

export default Login;
