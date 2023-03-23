import React from 'react';
import LoginTitle from './LoginTitle';
import LoginContainer from './LoginContainer';
import LoginSocial from './LoginSocial';
import '@styles/login/login.scss';
import RegisterButton from './RegisterButton';
import FindAccount from './FindAccount';

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
          <FindAccount />
          <RegisterButton />
        </div>
      </div>
    </div>
  );
};

export default Index;
