import React from 'react';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import { useSelector } from 'react-redux';
import useAccessToken from './hooks/useAccessToken';

const Home = loadable(() => import('@pages/home/Index'));
const Login = loadable(() => import('@pages/login/Index'));
const FindAccount = loadable(() => import('@pages/account/Index'));
const Register = loadable(() => import('@pages/register/Index'));
const SocialAuth = loadable(() => import('@components/common/SocialAuth'));
const NotFound = loadable(() => import('@components/common/NotFound'));

const App = () => {
  const { accessToken, expireTime } = useSelector((state) => state.accessToken);

  useAccessToken(accessToken, expireTime);

  return (
    <Routes>
      {!accessToken ? (
        <Route path='/' element={<Login />} />
      ) : (
        <Route path='/' element={<Home />} />
      )}
      <Route path='/account' element={<FindAccount />} />
      <Route path='/register' element={<Register />} />
      <Route path='/oauth/:provider/*' element={<SocialAuth />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
