import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeTokens } from '../../utils/auth';

const Index = () => {
  const navigate = useNavigate();
  const onRemove = () => {
    removeTokens();
    navigate('/');
  };

  return (
    <div>
      <h3>Home</h3>
      <button onClick={onRemove}>토큰 만료</button>
    </div>
  );
};

export default Index;
