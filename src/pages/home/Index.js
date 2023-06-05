import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import loadable from '@loadable/component';

import Modal from '@components/wrapper/Modal';
import Menu from '@constants/menu';
import useProimse from '@hooks/usePromise';
import { MAIN_SERVER } from '@config/setting';
import HomeMenu from './HomeMenu';
import HomeArticle from './HomeArticle';
import HomeLogo from './HomeLogo';
import HomeProfile from './HomeProfile';
import Write from './write/Write';
import '@styles/components/modalMessage.scss';

const Map = loadable(() => import('@components/map/Map'));

const Index = () => {
  const [selectedMenu, setSelectedMenu] = useState(Menu.TRIP);
  const [showMessage, setShowMessage] = useState('');
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

  // 메시지 애니메이션
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage('');
      }, 1000);
    }
  }, [showMessage]);

  const onClickMenuHandler = useCallback((clickedMenu, message) => {
    if (message) setShowMessage(message);

    setSelectedMenu(clickedMenu);
  }, []);

  if (loading || !markers || error) {
    return null;
  }

  let content = '';
  switch (selectedMenu) {
    case Menu.TRIP:
      content = '';
      break;
    case Menu.ROUTE:
      content = '';
      break;
    case Menu.LOG:
      content = '';
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

      <HomeMenu selectedMenu={selectedMenu} onClickMenu={onClickMenuHandler} />
      <HomeProfile />
      {content}
      {id && <HomeArticle id={id} accessToken={accessToken} />}

      <Map markers={markers.data} />

      {showMessage && (
        <Modal className='modal'>
          <div className='modal-message'>
            <p>{showMessage}</p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Index;
