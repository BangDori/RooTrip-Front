import React from 'react';
import { getAccessToken, removeTokens } from '@utils/auth';
import { logout } from '@services/user';
const Index = () => {
  const onRemove = async () => {
    const result = await logout(getAccessToken());

    if (result) {
      removeTokens();
      window.location.reload();
    }
  };

  return (
    <div>
      <h3>Home</h3>
      <button onClick={onRemove}>로그아웃</button>
    </div>
  );
};

export default Index;
