import React from 'react';

const SocialLogin = () => {
  return (
    <div className='social_login'>
      <button type='button' className='kakaobtn'>
        카카오톡 로그인
      </button>
      <button type='button' className='naverbtn'>
        네이버 로그인
      </button>
      <button type='button' className='googlebtn'>
        구글 로그인
      </button>
    </div>
  );
};

export default SocialLogin;
