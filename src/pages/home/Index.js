import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import useProimse from '@hooks/usePromise';
import { MAIN_SERVER } from '@config/setting';

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
  const { accessToken } = useSelector((state) => state.accessToken);
  const [loading, response, error] = useProimse(
    () =>
      axios.get(`${MAIN_SERVER}/api/post`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    [accessToken],
  );
  const { id } = useSelector((state) => state.article);

  const { data: markers } = response;

  const onChangeMode = useCallback(() => {
    setWriteMode((prevMode) => !prevMode);
  }, []);

  if (loading) {
    return null;
  }

  if (!markers) {
    return null;
  }

  if (error) {
    alert(error);
  }

  return (
    <>
      <HomeLogo />

      <HomeGnb onChangeMode={onChangeMode} />
      <HomeProfile />
      {writeMode && <Write onChangeMode={onChangeMode} />}
      {id && <HomeArticle id={id} accessToken={accessToken} />}

      <Map markers={markers.data} />
    </>
  );
};

export default Index;
