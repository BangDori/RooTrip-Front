import { useState, useCallback, useEffect } from 'react';
import loadable from '@loadable/component';
import { useDispatch, useSelector } from 'react-redux';

import { change } from '@store/menu';
import { exit } from '@store/article';
import Modal from '@components/wrapper/Modal';
import Menu from '@constants/menu';
import HomeMenu from './HomeMenu';
import HomeLogo from './HomeLogo';
import HomeProfile from './HomeProfile';
import Write from './write/Write';
import Trip from './trip/Trip';
import Route from './route/Route';
import Log from './log/ChooseTheme';
import '@styles/components/modalMessage.scss';
import '@styles/home/log.scss';

const Map = loadable(() => import('@components/map/Map'));

const Index = () => {
  const selectedMenu = useSelector((state) => state.menu);
  const [showMessage, setShowMessage] = useState('');
  const { id } = useSelector((state) => state.article);
  const dispatch = useDispatch();

  // 메시지 애니메이션
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage('');
      }, 2000);
    }
  }, [showMessage]);

  const onClickMenuHandler = useCallback(
    (clickedMenu, message) => {
      if (message) setShowMessage(message);

      dispatch(change(clickedMenu));
      if (id) dispatch(exit());
    },
    [dispatch, id],
  );

  let content = '';
  switch (selectedMenu) {
    case Menu.TRIP:
      content = <Trip />;
      break;
    case Menu.ROUTE:
      content = <Route />;
      break;
    case Menu.LOG:
      content = <Log />;
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

      <Map />

      {showMessage && (
        <Modal className='modal-message' background='white'>
          <p>{showMessage}</p>
        </Modal>
      )}
    </>
  );
};

export default Index;
