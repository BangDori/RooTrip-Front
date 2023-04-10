import React, { useCallback, useState } from 'react';
import RegisterEmailAuth from '@pages/register/registerForm/RegisterEmailAuth';
import styled from 'styled-components';
import { sendPassword } from '@services/user';

const StyledAccountForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 8px 0 0 30px;

  gap: 32px;
  .check_btn {
    cursor: pointer;
    background-color: rgb(72, 72, 196);
    color: white;
    font-size: 20px;
    font-weight: bold;
    border: 1px solid rgb(45, 45, 254);
    width: 150px;
    height: 50px;
    box-shadow: 4px 4px 2px 2px #ccc;
    margin-left: 64px;
  }
  .Ncheck_btn {
    cursor: default;
    background-color: rgb(172, 172, 254);
    color: white;
    font-size: 20px;
    font-weight: bold;
    border: 1px solid rgb(172, 172, 254);
    width: 150px;
    height: 50px;
    box-shadow: 4px 4px 2px 2px #ccc;
    margin-left: 64px;
  }
`;

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
    <StyledAccountForm onSubmit={handleSubmit}>
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
    </StyledAccountForm>
  );
};

export default AccountForm;
