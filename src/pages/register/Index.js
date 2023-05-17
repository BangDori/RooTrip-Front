import React from 'react';
import Title from '@components/wrapper/Title';
import TOC from '@components/wrapper/TOC';
import '@styles/components/Title.scss';
import '@styles/register/register.scss';
import RegisterContainer from './RegisterContainer';

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
    name: '이메일 인증',
  },
  {
    id: 4,
    name: '닉네임',
  },
  {
    id: 5,
    name: '비밀번호',
  },
  {
    id: 6,
    name: '비밀번호 확인',
  },
];

const Index = () => {
  return (
    <>
      <Title title='JOIN MEMBERS' className='registerTitle'>
        <h2>JOIN MEMBERS</h2>
      </Title>
      <div className='Register_main'>
        <TOC table={table} />
        <RegisterContainer />
      </div>
    </>
  );
};

export default Index;
