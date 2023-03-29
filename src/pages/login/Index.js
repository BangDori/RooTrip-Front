import React from 'react';
import LoginTitle from './LoginTitle';
import LoginContainer from './LoginContainer';
import LoginSocial from './LoginSocial';
import '@styles/login/login.scss';
import Account from './Account';
import loadable from '@loadable/component';

const Map = loadable(() => import('@components/Map'));

const Index = () => {
  return (
    <div className='map-container'>
      <div className='whole_page'>
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
      <Map />
    </div>
  );
};

export default Index;
