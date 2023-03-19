import React from 'react';
import LoginTitle from './LoginTitle';
import LoginContainer from './LoginContainer';
import LoginSocial from './LoginSocial';
import '@styles/login/login.scss';

const Index = () => {
  return (
    <div className='map-container'>
      <div className='LoginPage'>
        <LoginTitle />
        <LoginContainer />
        <LoginSocial />
      </div>
    </div>
  );
};

export default Index;
