import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import loadable from '@loadable/component';

import Menu from '@constants/menu';
import useProimse from '@hooks/usePromise';
import { MAIN_SERVER } from '@config/setting';
import HomeGnb from './HomeGnb';
import HomeArticle from './HomeArticle';
import HomeLogo from './HomeLogo';
import HomeProfile from './HomeProfile';
import Write from './write/Write';
import '@styles/home/Write.scss';

const Map = loadable(() => import('@components/map/Map'));

const Index = () => {
  const [selectedMenu, setSelectedMenu] = useState(Menu.TRIP);
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

  const onClickMenuHandler = useCallback((clickedMenu) => {
    setSelectedMenu(clickedMenu);
  }, []);

  if (loading || !markers || error) {
    return null;
  }

  let content = '';
  switch (selectedMenu) {
    case Menu.TRIP:
      content = 'Trip';
      break;
    case Menu.ROUTE:
      content = 'Route';
      break;
    case Menu.LOG:
      content = 'Log';
      break;
    case Menu.WRITE:
      content = <Write onClose={onClickMenuHandler} />;
      break;
    default:
      break;
  }

  return (
    <>
      <HomeLogo />

      <HomeGnb selectedMenu={selectedMenu} onClickMenu={onClickMenuHandler} />
      <HomeProfile />
      {content}
      {id && <HomeArticle id={id} accessToken={accessToken} />}

      <Map markers={markers.data} />
    </>
  );
};

export default Index;
