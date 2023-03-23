import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@assets/Logo.png';
import '@styles/register/register.scss';

const Title = () => (
  <div className='Register_Title'>
    <Link to='/' className='Go_before_page'>
      <img className='logo' src={Logo} alt='로고사진' />
      <span className='content'>JOIN MEMBERS</span>
    </Link>
  </div>
);

export default Title;
