import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChangeForm from './ChangeForm';

const ChangeContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = useCallback(
    (password) => {
      // 패스워드 변경 전송 함수
      console.log(location.state, password);

      //   navigate('/');
    },
    [location],
  );

  return <ChangeForm onChange={onChange} />;
};

export default ChangeContainer;
