import React from 'react';
import HomeGnb from './HomeGnb';
import HomeArticle from './HomeArticle';
import '@styles/home/Write.scss';
import loadable from '@loadable/component';
import HomeLogo from './HomeLogo';
import HomeProfile from './HomeProfile';

const Map = loadable(() => import('@components/Map'));

const Index = () => {
  return (
    <>
      <HomeLogo />

      <HomeGnb />
      <HomeProfile />

      <HomeArticle />

      <Map />
    </>
  );
};

export default Index;
