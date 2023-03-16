import React from 'react';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import useToken from '@hooks/useToken';

const Home = loadable(() => import('@pages/home/Index'));
const Login = loadable(() => import('@pages/login/Index'));
const Register = loadable(() => import('@pages/register/Index'));
const Auth = loadable(() => import('@components/Auth'));
const NotFound = loadable(() => import('@components/NotFound'));
const Email = loadable(() => import('@pages/register/certification/Email'));

const App = () => {
  const accessToken = useToken();

  return (
    <Routes>
      {accessToken ? (
        <Route path='/' element={<Home />} />
      ) : (
        <Route path='/' element={<Login />} />
      )}
      <Route path='/register' element={<Register />} />
      <Route path='/register/certification' element={<Email />} />
      <Route path='/oauth/:provider/*' element={<Auth />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
