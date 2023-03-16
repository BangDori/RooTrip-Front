import LoginContainer from '@containers/login/LoginContainer';
import SocialLogin from './SocialLogin';
import Title from './Title';
import '@styles/login/login.scss';
import React from 'react';

const Index = () => {
  return (
    <div className='map-container'>
      <div className='LoginPage'>
        <Title />
        <LoginContainer />
        <SocialLogin />
      </div>
    </div>
  );
};

export default Index;
