import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@assets/Logo.png';

const Title = ({ className, children }) => (
  <Link to='/' className={className}>
    <div className='goBeforePage'>
      <img src={Logo} alt='로고사진' />
      {children}
    </div>
  </Link>
);

export default Title;
