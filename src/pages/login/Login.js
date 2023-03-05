import React from 'react';

const LocalLogin = () => {
  return (
    <div className='login_index'>
      <input
        className='logintext'
        type='text'
        name='ID'
        placeholder='사용자 이메일 또는 아이디'
      />
      <input
        className='logintext'
        type='text'
        name='PW'
        placeholder='비밀번호'
      />
      <button type='button' className='loginbtn'>
        로그인
      </button>
      <button type='button' className='gosignupbtn'>
        회원 가입
      </button>
    </div>
  );
};

export default LocalLogin;
