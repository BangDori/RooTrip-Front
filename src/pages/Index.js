import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './login/Index';
import Home from './home/Index';

const Index = () => {
  // 로그인 시 유저정보를 받아오기 위한 field
  // 토큰 정보를 저장, 상태 변경 필요
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Routes>
      {isLogin ? (
        <Route path='/' element={<Home />} />
      ) : (
        <Route path='/' element={<Login />} />
      )}
    </Routes>
  );
};

export default Index;
