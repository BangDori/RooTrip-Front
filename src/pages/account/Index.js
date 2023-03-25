import React from 'react';
import Title from '@components/account/Title';
import AccountExplain from './AccountExplain';
import TOC from '@components/account/TOC';
import AccountContainer from './AccountContainer';

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
      <Title title='Find Password' />
      <div>
        <AccountExplain>
          비밀번호 재설정을 위해, 이메일 인증을 진행해 주세요.
        </AccountExplain>
        <TOC table={table} />
        <AccountContainer />
      </div>
    </>
  );
};

export default FindAccount;
