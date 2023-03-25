import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountForm from './AccountForm';

const AccountContainer = () => {
  const navigate = useNavigate();

  const onMove = useCallback(
    (email) => {
      navigate('./change', { state: email });
    },
    [navigate],
  );

  return <AccountForm onMove={onMove} />;
};

export default AccountContainer;
