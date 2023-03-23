import React from 'react';
import { Link } from 'react-router-dom';

const FindAccount = () => {
  return (
    <div className='account-box'>
      <Link to='/accounts'>
        <span>비밀번호를 잊으셨나요?</span>
      </Link>
    </div>
  );
};

export default FindAccount;
