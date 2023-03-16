import React, { useCallback, useState } from 'react';
import '@styles/register/register.scss';
import { verifyEmail } from '@services/user.js';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { send } from '@store/emailAuth';
import { verifyCode } from '../../services/user';

const Register = ({ form, messages, onInput, onCheck }) => {
  const { name, email, nickname, password, gender, cpassword } = form;
  const emailAuth = useSelector((state) => state.emailAuth);
  const dispatch = useDispatch();
  const [code, setCode] = useState('');

  const sendEmail = useCallback(async () => {
    try {
      if (!messages.email) {
        const result = await verifyEmail(email);

        dispatch(send(result));
      }
    } catch (e) {
      console.log(e);
    }
  }, [email, dispatch, messages.email]);

  const onVerifyEmail = useCallback(async () => {
    try {
      const result = await verifyCode(code);

      if (result) {
        alert('인증이 완료되었습니다.');
        dispatch(send(false));
      } else {
        alert('코드가 일치하지 않습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  }, [code, dispatch]);

  return (
    <div className='User_data_content'>
      <div className='Name'>
        <input
          name='name'
          value={name}
          onChange={onInput}
          onBlur={(e) => onCheck(e.target.name, e.target.value)}
          placeholder='이름을 입력해주세요'
        />
        <div className='check_box'>
          <span className='check_sex'>
            <button
              type='button'
              name='gender'
              value='M'
              className={cn({ checked: gender === 'M' })}
              onClick={onInput}
            >
              남
            </button>
          </span>
          <span className='check_sex'>
            <button
              type='button'
              name='gender'
              value='W'
              className={cn({ checked: gender === 'W' })}
              onClick={onInput}
            >
              여
            </button>
          </span>
          {messages.name && <span>{messages.name}</span>}
        </div>
      </div>
      <div className='email'>
        <input
          type='text'
          name='email'
          value={email}
          onChange={onInput}
          onBlur={(e) => onCheck(e.target.name, e.target.value)}
          placeholder='email을 형식에 맞게 입력해주세요'
        />
        {!emailAuth ? (
          <button type='button' className='Certi_email_btn' onClick={sendEmail}>
            인증하기
          </button>
        ) : (
          <button type='button' className='Certi_email_btn'>
            재발신
          </button>
        )}
        {messages.email && <span>{messages.email}</span>}
      </div>
      {emailAuth && (
        <div className='Certi_email_Num'>
          <input
            className='input_certi_email_Num'
            name='code'
            placeholder='인증번호 입력'
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <span className='Certi_Timer'>잔여 시간 표시해야함</span>
          <button
            style={{ marginLeft: '69px' }}
            className='Certi_email_btn'
            type='button'
            onClick={onVerifyEmail}
          >
            인증하기
          </button>
        </div>
      )}
      <div>
        <input
          type='text'
          name='nickname'
          value={nickname}
          onChange={onInput}
          onBlur={(e) => onCheck(e.target.name, e.target.value)}
          placeholder='닉네임을 입력해주세요'
        />
        {messages.nickname && <span>{messages.nickname}</span>}
      </div>
      <div>
        <input
          type='text'
          className='password'
          name='password'
          value={password}
          onChange={onInput}
          onBlur={(e) => onCheck(e.target.name, e.target.value)}
          placeholder='비밀번호를 입력해주세요'
        />
        {messages.password && <span>{messages.password}</span>}
      </div>
      <div>
        <input
          type='text'
          className='cpassword'
          name='cpassword'
          value={cpassword}
          onChange={onInput}
          onBlur={(e) => onCheck(e.target.name, e.target.value)}
          placeholder='비밀번호를 한번 더 입력해주세요'
        />
        {messages.cpassword && <span>{messages.cpassword}</span>}
      </div>
    </div>
  );
};

export default Register;
