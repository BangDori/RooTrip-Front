import React from 'react';
import Title from '@components/wrapper/Title';
import TOC from '@components/wrapper/TOC';
import AccountContainer from './AccountContainer';
import '@styles/components/Title.scss';

const table = [
  {
    id: 1,
    name: '이메일 인증',
  },
  {
    id: 2,
    name: '인증번호',
  },
];

const FindAccount = () => {
  return (
    <>
      <Title className='registerTitle'>
        <h2>Find Password</h2>
      </Title>
      <div>
        <TOC table={table} />
        <AccountContainer />
      </div>
    </>
  );
};

export default FindAccount;
