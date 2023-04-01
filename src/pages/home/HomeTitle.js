import React from 'react';
import Logo from '@assets/Logo.png';

const HomeTitle = () => {
  return (
    <div className='Title'>
      <img src={Logo} alt='루트트립 로고' className='Logo' />
    </div>
  );
};

export default HomeTitle;
