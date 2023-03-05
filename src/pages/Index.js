import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './login/Index';
import Home from './home/Index';
import Register from './register/Index';

const Index = () => {
  // accssToken, refreshToken 저장 필요
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Routes>
      {isLogin ? (
        <Route path='/' element={<Home />} />
      ) : (
        <Route path='/' element={<Login />} />
      )}
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};

export default Index;
