import React, { useCallback, useState } from 'react';
import menu_friend from '@assets/친구 게시글.png';
import menu_Route from '@assets/Route.png';
import menu_Trip from '@assets/Trip.png';
import Article_input from '@assets/article_input.png';
import WriteBase from '../Wrtie/WriteBase';
import ModalPortal from '@components/ModalPortal';

const HomeSnb = () => {
  const [modal, setModal] = useState(false);

  const showModal = useCallback(() => {
    setModal(true);
  }, []);

  return (
    <>
      <div className='menu'>
        <div className='menu_Icon'>
          <div className='icon_up'>
            <button type='button'>
              <img src={menu_friend} alt='친구 게시글' />
            </button>
            <span>친구 게시글</span>
          </div>
          <div className='icon_up' id='Trip_nav'>
            <button type='button'>
              <img src={menu_Trip} alt='Trip' />
            </button>
            <span>Trip</span>
          </div>
          <div className='icon_up'>
            <button type='button'>
              <img src={menu_Route} alt='Route' />
            </button>
            <span>Route</span>
          </div>
          <div className='icon_up'>
            <button type='button'>Log</button>
            <span>Log</span>
          </div>
          <div className='icon_up' onClick={showModal}>
            <button type='button'>
              <img src={Article_input} alt='게시글 작성' />
            </button>
            <span>게시글 작성</span>
          </div>
        </div>
      </div>

      {modal && (
        <ModalPortal>
          <div className='modal_back' />
          <WriteBase setModal={setModal} />
        </ModalPortal>
      )}
    </>
  );
};

export default HomeSnb;
