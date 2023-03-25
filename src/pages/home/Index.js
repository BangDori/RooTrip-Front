import React from 'react';
import { logout } from '@services/user';
import Nav from './Nav';
import Article from './Article';
import '@styles/home/Write.scss';
import WriteBase from './Wrtie/WriteBase';
import { useDispatch } from 'react-redux';
import { remove } from '@store/accessToken';
import Map from '../../components/Map';

const Index = ({ modal, setModal }) => {
  const dispatch = useDispatch();

  const onRemove = async () => {
    try {
      await logout();
      dispatch(remove());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Map></Map>
      <div>
        <button onClick={onRemove}>로그아웃</button>
        <Nav />
        <Article />
      </div>
    </>
  );
};

export default Index;
