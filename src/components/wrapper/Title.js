import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@assets/Logo.png';

const Title = ({ className, title }) => (
  <Link to='/' className={className}>
    <div className='goBeforePage'>
      <img src={Logo} alt='로고사진' />
      <h2>{title}</h2>
    </div>
  </Link>
);

export default Title;
