import { useState, useCallback } from 'react';
import loadable from '@loadable/component';
import HomeGnb from './HomeGnb';
import HomeArticle from './HomeArticle';
import '@styles/home/Write.scss';
import HomeLogo from './HomeLogo';
import HomeProfile from './HomeProfile';
import Write from './write/Write';

const Map = loadable(() => import('@components/Map'));

const Index = () => {
  const [write, setWrite] = useState(false);
  return (
    <>
      <HomeLogo />

      <HomeGnb write={write} setWrite={setWrite} />
      <HomeProfile />

      {write === true ? (
        <Write write={write} setWrite={setWrite} />
      ) : (
        <HomeArticle />
      )}

      <Map />
    </>
  );
};

export default Index;
