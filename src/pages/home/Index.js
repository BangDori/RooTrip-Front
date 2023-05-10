import { useState, useCallback } from 'react';
import loadable from '@loadable/component';
import HomeGnb from './HomeGnb';
import HomeArticle from './HomeArticle';
import '@styles/home/Write.scss';
import HomeLogo from './HomeLogo';
import HomeProfile from './HomeProfile';
import Write from './write/Write';

const Map = loadable(() => import('@components/map/Map'));

const Index = () => {
  const [writeMode, setWriteMode] = useState(false);

  const onChangeMode = useCallback(() => {
    setWriteMode((prevMode) => !prevMode);
  }, []);

  return (
    <>
      <HomeLogo />

      <HomeGnb onChangeMode={onChangeMode} />
      <HomeProfile />
      {writeMode ? <Write onChangeMode={onChangeMode} /> : <HomeArticle />}

      <Map />
    </>
  );
};

export default Index;
