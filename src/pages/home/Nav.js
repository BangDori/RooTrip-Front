import React from 'react';
import Logo from '@assets/Logo.png';
import Profile from '@assets/태훈이 프사.jpg';
import menu_friend from '@assets/친구 게시글.png';
import menu_Route from '@assets/Route.png';
import menu_Trip from '@assets/Trip.png';
import '@styles/home/Nav.scss';

const Nav = () => {
  return (
    <>
      <nav>
        <div className='Side_nav'>
          <div className='Title'>
            <img src={Logo} alt='루트트립 로고' className='Logo' />
            <img src={Profile} alt='태훈이 사진' className='Profile' />
          </div>
          <div className='menu'>
            <div className='menu_Icon'>
              <div className='icon_up'>
                <button type='button'>
                  <img src={menu_friend} alt='친구 게시글' />
                </button>
                <span>친구 게시글</span>
              </div>
              <div className='icon_up'>
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
                <span>log</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
