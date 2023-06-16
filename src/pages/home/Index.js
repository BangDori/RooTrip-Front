import { useState, useCallback, useEffect } from 'react';
import loadable from '@loadable/component';
import { useDispatch, useSelector } from 'react-redux';

import { exit } from '@store/article';
import { resetMap } from '@store/map';
import { change } from '@store/marker';
import Modal from '@components/wrapper/Modal';
import Menu from '@constants/menu';
import HomeMenu from './HomeMenu';
import HomeLogo from './HomeLogo';
import Write from './write/Write';
import Route from './route/Route';
import Log from './log/ChooseTheme';
import '@styles/components/modalMessage.scss';
import '@styles/home/log.scss';
import Post from './trip/Post';

const Map = loadable(() => import('@components/map/Map'));

const Index = () => {
  const [showMessage, setShowMessage] = useState('');

  const accessToken = useSelector((state) => state.auth.accessToken);
  const { postId } = useSelector((state) => state.article);
  const menu = useSelector((state) => state.marker.menu);
  const dispatch = useDispatch();

  // 메시지 애니메이션
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage('');
      }, 2000);
    }
  }, [showMessage]);

  const onCloseHandler = useCallback(
    (clickedMenu, message) => {
      if (message) setShowMessage(message);

      dispatch(change({ clickedMenu }));
      dispatch(resetMap());
      dispatch(exit());
    },
    [dispatch],
  );

  let content = '';
  switch (menu) {
    case Menu.ROUTE:
      content = <Route />;
      break;
    case Menu.LOG:
      content = <Log />;
      break;
    case Menu.WRITE:
      content = <Write onClose={onCloseHandler} />;
      break;
    default:
      break;
  }

  return (
    <>
      <HomeLogo />

      <HomeMenu onClickMenu={onCloseHandler} />

      {content}

      <Map />

      {showMessage && (
        <Modal background='white'>
          <div className='modal-message'>
            <p>{showMessage}</p>
          </div>
        </Modal>
      )}

      {postId && <Post postId={postId} accessToken={accessToken} />}
    </>
  );
};

export default Index;
