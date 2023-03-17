import React, { useCallback, useMemo, useRef, useState } from 'react';
import '@styles/register/register.scss';
import cn from 'classnames';
import { verifyEmail, verifyCode } from '@services/user';
import Input from '@components/Input';
import Button from '@components/Button';
import CheckGender from '@components/register/CheckGender';

const Register = ({ form, messages, onInput, onCheck }) => {
  const { name, email, nickname, password, gender, cpassword } = form;
  const [verifyNumber, setVerifyNumber] = useState('');
  const [verify, setVerify] = useState(false);

  const memoizedSetVerifyNumber = useMemo(() => {
    return (e) => {
      setVerifyNumber((prevNumber) => {
        if (prevNumber === e.target.value) {
          return prevNumber; // 이전 상태와 같은 경우 렌더링을 방지하기 위해 이전 값을 반환
        }
        return e.target.value;
      });
    };
  }, [setVerifyNumber]); // setVerifyNumber를 의존성 배열에 추가하여 최신 값으로 업데이트되도록 함

  const sendEmail = useCallback(async () => {
    try {
      if (!messages.email) {
        setVerify(true);
        const result = await verifyEmail(email);

        // start the timer
      }
    } catch (e) {
      console.log(e);
    }
  }, [email, messages.email]);

  const onVerifyEmail = useCallback(async () => {
    try {
      const result = await verifyCode(email, verifyNumber);

      if (result) {
        alert('인증이 완료되었습니다.');
      } else {
        alert('코드가 일치하지 않습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  }, [email, verifyNumber]);

  const onResendEmail = useCallback(() => {
    //   clearInterval(timerIdRef.current);

    sendEmail();
  }, [sendEmail]);

  return (
    <div className='User_data_content'>
      <Input
        name='name'
        value={name}
        onChange={onInput}
        onBlur={onCheck}
        placeholder='이름을 입력해주세요'
      />
      <CheckGender gender={gender} onInput={onInput} />
      <Input
        name='email'
        value={email}
        onChange={onInput}
        onBlur={onCheck}
        placeholder='email을 형식에 맞게 입력해주세요'
      />
      {!verify ? (
        <Button
          type='button'
          className='Certi_email_btn'
          onClick={sendEmail}
          content='인증하기'
        />
      ) : (
        <Button
          type='button'
          className='Certi_email_btn'
          onClick={onResendEmail}
          content='재발신'
        />
      )}
      {messages.email && <span>{messages.email}</span>}
      {verify && (
        <div className='Certi_email_Num'>
          <Input
            className='input_certi_email_Num'
            name='verifyNumber'
            placeholder='인증번호 입력'
            value={verifyNumber}
            onChange={memoizedSetVerifyNumber}
          />
          <span className='Certi_Timer'>{'시간'}</span>
          <Button
            style={{ marginLeft: '69px' }}
            className='Certi_email_btn'
            type='button'
            onClick={onVerifyEmail}
            content='인증하기'
          />
        </div>
      )}
      <Input
        name='nickname'
        value={nickname}
        onChange={onInput}
        onBlur={onCheck}
        message={messages.nickname}
        placeholder='닉네임을 입력해주세요'
      />
      <Input
        className='password'
        name='password'
        value={password}
        onChange={onInput}
        onBlur={onCheck}
        message={messages.password}
        placeholder='비밀번호를 입력해주세요'
      />
      <Input
        className='cpassword'
        name='cpassword'
        value={cpassword}
        onChange={onInput}
        onBlur={onCheck}
        message={messages.cpassword}
        placeholder='비밀번호를 한번 더 입력해주세요'
      />
    </div>
  );
};

export default Register;
