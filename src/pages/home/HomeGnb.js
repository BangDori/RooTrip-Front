import React from 'react';
import MenuFriend from '@assets/MenuFriend.png';
import MenuTrip from '@assets/MenuTrip.png';
import MenuRoute from '@assets/MenuRoute.png';
import MenuHot from '@assets/MenuHot.png';
import articleInput from '@assets/article_input.png';
import '@styles/home/Nav.scss';

const HomeGnb = ({ onChangeMode }) => {
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
          <div className='icon_up selected'>
            <button type='button'>
              <img src={MenuTrip} alt='Menu Trip' />
            </button>
            <span>Trip</span>
          </div>
          <div className='icon_up'>
            <button type='button'>
              <img src={MenuRoute} alt='Menu Route' />
            </button>
            <span>Route</span>
          </div>
          <div className='icon_up'>
            <button type='button'>
              <img src={MenuHot} alt='Menu Hot' style={{ width: '26px' }} />
            </button>
            <span>Log</span>
          </div>
          <div className='icon_up' onClick={onChangeMode}>
            <button type='button'>
              <img
                src={articleInput}
                alt='게시글 작성'
                style={{ width: '28px' }}
              />
            </button>
            <span>게시글 작성</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeGnb;
