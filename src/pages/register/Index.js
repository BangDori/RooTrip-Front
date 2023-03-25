import React from 'react';
import RegisterContainer from './RegisterContainer';
import Title from '@components/account/Title';
import TOC from '@components/account/TOC';

const table = [
  {
    id: 1,
    name: '이름',
  },
  {
    id: 2,
    name: '이메일',
    classname: 'email_check',
  },
  {
    id: 3,
    name: '닉네임',
  },
  {
    id: 4,
    name: '비밀번호',
  },
  {
    id: 5,
    name: '비밀번호 확인',
  },
];

const Index = () => {
  return (
    <>
      <Title title='JOIN MEMBERS' />
      <div className='Register_main'>
        <TOC table={table} />
        <RegisterContainer />
      </div>
    </>
  );
};

export default Index;
