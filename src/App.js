import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Index';
import Home from './pages/home/Index';
import Register from './pages/register/Index';
import useToken from './hooks/useToken';

const App = () => {
  const accessToken = useToken();

  return (
    <Routes>
      {accessToken ? (
        <Route path='/' element={<Home />} />
      ) : (
        <Route path='/' element={<Login />} />
      )}
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};

export default App;
