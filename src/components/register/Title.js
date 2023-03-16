import React from 'react';
import { Link } from 'react-router-dom';
import '@styles/register/register.scss';
import Logo from '@assets/Logo.png';

const Title = () => (
  <Link to='/' className='Go_before_page'>
    <div className='Register_Title'>
      <img className='logo' src={Logo} alt='로고사진' />
      <span className='content'>JOIN MEMBERS</span>
    </div>
  </Link>
);

export default Title;
