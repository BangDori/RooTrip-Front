import React from 'react';
import HomeNav from './HomeNav';
import Article from './Article';
import '@styles/home/Write.scss';
import WriteBase from './Wrtie/WriteBase';
import { useDispatch } from 'react-redux';
import { remove } from '@store/accessToken';
import loadable from '@loadable/component';

const Map = loadable(() => import('@components/Map2'));

const Index = ({ modal, setModal }) => {
  return (
    <>
      <Map />
      <div>
        <HomeNav />
        <Article />
      </div>
    </>
  );
};

export default Index;
