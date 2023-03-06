import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './login/Index';
import Home from './home/Index';
import Register from './register/Index';

const Index = () => {
  const { status } = useSelector((state) => state.user);

  return (
    <Routes>
      {status ? (
        <Route path='/' element={<Home />} />
      ) : (
        <Route path='/' element={<Login />} />
      )}
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};

export default Index;
