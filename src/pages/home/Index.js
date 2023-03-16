import React from 'react';
import { getAccessToken, removeTokens } from '@utils/auth';
import { logout } from '@services/user';
import Nav from './Nav';
import Article from './Article';
import '@styles/home/Write.scss';
import WriteBase from './WriteBase';

const Index = ({ modal, setModal }) => {
  const onRemove = async () => {
    const result = await logout(getAccessToken());

    if (result) {
      removeTokens();
      window.location.reload();
    }
  };
  return (
    <>
      <div>
        <button onClick={onRemove}>로그아웃</button>
        <div className='map'>
          <Nav />
          <Article />
        </div>
      </div>
    </>
  );
};

export default Index;
