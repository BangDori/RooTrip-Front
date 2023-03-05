import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../services/user';

const LocalLogin = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { email, password } = form;

  const onChange = useCallback(
    (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    },
    [form],
  );

  const onLogin = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        // accessToken, refreshToken 저장
        const { accessToken, refreshToken } = await login(form);

        setForm({
          email: '',
          password: '',
        });
      } catch (e) {
        console.log(e);
      }
    },
    [form],
  );

  return (
    <form className='login_index' action='' method='post' onSubmit={onLogin}>
      <input
        className='logintext'
        name='email'
        value={email}
        placeholder='사용자 이메일 또는 아이디'
        onChange={onChange}
      />
      <input
        className='logintext'
        name='password'
        value={password}
        placeholder='비밀번호'
        onChange={onChange}
      />
      <button type='submit' className='loginbtn'>
        로그인
      </button>
      <Link to='/register'>
        <button type='button' className='gosignupbtn'>
          회원 가입
        </button>
      </Link>
    </form>
  );
};

export default LocalLogin;
