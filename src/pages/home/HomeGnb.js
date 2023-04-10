import React, { useCallback, useState } from 'react';
import MenuFriend from '@assets/친구 게시글.png';
import menuTrip from '@assets/Trip.png';
import menuRoute from '@assets/Route.png';
import articleInput from '@assets/article_input.png';
import ModalPortal from '@components/ModalPortal';
import Write from './write/Write';
import '@styles/home/Nav.scss';

const HomeGnb = () => {
  const [modal, setModal] = useState(false);

  const showModal = useCallback(() => {
    setModal(true);
  }, []);

  return (
    <nav className='side_nav'>
      <div className='menu'>
        <div className='menu_Icon'>
          <div className='icon_up'>
            <button type='button'>
              <img src={MenuFriend} alt='친구 게시글' />
            </button>
            <span>친구 게시글</span>
          </div>
          <div className='icon_up' id='Trip_nav'>
            <button type='button'>
              <img src={menuTrip} alt='Trip' />
            </button>
            <span>Trip</span>
          </div>
          <div className='icon_up'>
            <button type='button'>
              <img src={menuRoute} alt='Route' />
            </button>
            <span>Route</span>
          </div>
          <div className='icon_up'>
            <button type='button'>Log</button>
            <span>Log</span>
          </div>
          <div className='icon_up' onClick={showModal}>
            <button type='button'>
              <img src={articleInput} alt='게시글 작성' />
            </button>
            <span>게시글 작성</span>
          </div>
        </div>
      </div>

      {modal && (
        <ModalPortal>
          <div className='modal_back' />
          <Write setModal={setModal} />
        </ModalPortal>
      )}
    </nav>
  );
};

export default HomeGnb;
