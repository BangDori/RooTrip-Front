import React from 'react';
import HomeGnb from './HomeGnb';
import HomeArticle from './HomeArticle';
import '@styles/home/Write.scss';
import loadable from '@loadable/component';
import HomeTitle from './HomeTitle';

const Map = loadable(() => import('@components/Map2'));

const Index = () => {
  return (
    <>
      <HomeTitle />

      <HomeGnb />
      <HomeArticle />

      <Map />
    </>
  );
};

export default Index;
