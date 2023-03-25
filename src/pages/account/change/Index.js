import React from 'react';
import Title from '@components/account/Title';
import AccountExplain from '../AccountExplain';
import TOC from '@components/account/TOC';
import ChangeContainer from './ChangeContainer';

const table = [
  {
    id: 1,
    name: '새로운 비밀번호',
  },
  {
    id: 2,
    name: '비밀번호 확인',
  },
];

const Index = () => {
  return (
    <>
      <Title title='Find Password' />
      <div>
        <AccountExplain>비밀번호를 재 설정 합니다.</AccountExplain>
        <TOC table={table} />
        <ChangeContainer />
      </div>
    </>
  );
};

export default Index;
