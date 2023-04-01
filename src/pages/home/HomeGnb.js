import React from 'react';
import '@styles/home/Nav.scss';
import HomeProfile from './navigation/HomeProfile';
import HomeSnb from './navigation/HomeSnb';

const HomeGnb = () => {
  return (
    <>
      <nav className='side_nav'>
        <HomeSnb />
      </nav>

      <HomeProfile />
    </>
  );
};

export default HomeGnb;
