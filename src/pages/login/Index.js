import React from 'react';
import LoginTitle from './LoginTitle';
import LoginContainer from './LoginContainer';
import LoginSocial from './LoginSocial';
import '@styles/login/login.scss';
import Account from './Account';

const Index = () => {
  return (
    <div className='map-container'>
      <div className='pages'>
        <div className='LoginPage'>
          <LoginTitle />
          <LoginContainer />
          <LoginSocial />
        </div>
        <div className='AccountPage'>
          <Account />
        </div>
      </div>
    </div>
  );
};

export default Index;
