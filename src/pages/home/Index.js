import React from 'react';
import { removeAccessToken, removeRefreshToken } from '../../utils/auth';

const Index = () => {
  const onRemove = () => {
    removeAccessToken();
    removeRefreshToken();
    window.location.reload();
  };

  return (
    <div>
      <h3>Home</h3>
      <button onClick={onRemove}>토큰 만료</button>
    </div>
  );
};

export default Index;
