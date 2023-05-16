import React, { useCallback, useState } from 'react';
import RegisterEmailAuth from '@pages/register/registerForm/RegisterEmailAuth';
import { sendPassword } from '@services/email';
import '@styles/account/account.scss';

const AccountForm = ({ changePassword }) => {
  const [email, setEmail] = useState('');
  const [validation, setValidation] = useState(false);
  const [verifyNumber, setVerifyNumber] = useState('');

  const onInput = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // 페이지 이동
      if (!validation) return;

      try {
        // 임시 비밀번호 전송
        sendPassword(email, verifyNumber);
        changePassword();
      } catch (error) {
        alert(error.message);
      }
    },
    [changePassword, email, verifyNumber, validation],
  );

  return (
    <div className='account-form' onSubmit={handleSubmit}>
      <RegisterEmailAuth
        validateCheck={false}
        email={email}
        onInput={onInput}
        setValidation={setValidation}
        setVerifyNumber={setVerifyNumber}
      />
      <button
        type='submit'
        className={validation ? 'check_btn' : 'Ncheck_btn'}
        disabled={!validation}
      >
        변경하기
      </button>
    </div>
  );
};

export default AccountForm;
