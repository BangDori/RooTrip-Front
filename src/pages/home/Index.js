import { useState, useCallback, useEffect } from 'react';
import loadable from '@loadable/component';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '@services/post';
import { exit } from '@store/article';
import { resetMap } from '@store/map';
import { change, load } from '@store/marker';
import Modal from '@components/wrapper/Modal';
import Menu from '@constants/menu';
import HomeMenu from './HomeMenu';
import HomeLogo from './HomeLogo';
import Write from './write/Write';
import Trip from './trip/Trip';
import Route from './route/Route';
import Log from './log/ChooseTheme';
import '@styles/components/modalMessage.scss';
import '@styles/home/log.scss';

const Map = loadable(() => import('@components/map/Map'));

const Index = () => {
  const [showMessage, setShowMessage] = useState('');

  const { accessToken } = useSelector((state) => state.accessToken);
  const menu = useSelector((state) => state.marker.menu);
  const { postId } = useSelector((state) => state.article);
  const { viewType, markerCount, polygon } = useSelector((state) => state.map);
  const dispatch = useDispatch();

  // 메시지 애니메이션
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage('');
      }, 2000);
    }
  }, [showMessage]);

  useEffect(() => {
    dispatch(exit());

    const getMarkers = async () => {
      const data = await getPosts(accessToken, viewType, polygon, markerCount);
      dispatch(load({ data }));
    };

    if (menu === Menu.TRIP) getMarkers();
  }, [dispatch, menu, accessToken, viewType, polygon, markerCount]);

  const onClickMenuHandler = useCallback(
    (clickedMenu, message) => {
      if (message) setShowMessage(message);

      dispatch(change({ clickedMenu }));
      dispatch(resetMap());
      if (postId) dispatch(exit());
    },
    [dispatch, postId],
  );

  let content = '';
  switch (menu) {
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

      <HomeMenu onClickMenu={onClickMenuHandler} />

      {content}

      <Map />

      {showMessage && (
        <Modal background='white'>
          <div className='modal-message'>
            <p>{showMessage}</p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Index;
