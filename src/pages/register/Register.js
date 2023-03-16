import React, { useCallback, useEffect, useRef, useState } from 'react';
import '@styles/register/register.scss';
import { verifyEmail } from '@services/user.js';
import cn from 'classnames';

// export const InputBox = ({ name, value, placeholder, message, ...attr }) => {
//   return (
//     <>
//       <input name={name} value={value} placeholder={placeholder} {...attr} />
//       {message && <span>{message}</span>}
//     </>
//   );
// };

const Register = ({ form, messages, onInput, onCheck }) => {
  const { name, email, nickname, password, gender, cpassword } = form;
  const [send, setSend] = useState(false);
  const remainTime = useRef(null);
  const refName = useRef(null);

  const sendEmail = useCallback(async () => {
    try {
      const result = await verifyEmail(email);

      setSend(result);
      remainTime.current = 180;

      setInterval(() => {
        remainTime.current -= 1;
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }, [email]);

  useEffect(() => {
    refName.current.focus();
  }, []);

  return (
    <div>
      <div className='User_data_content'>
        <div className='Name'>
          <input
            ref={refName}
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
          {!send ? (
            <button
              type='button'
              className='Certi_email_btn'
              onClick={sendEmail}
            >
              인증하기
            </button>
          ) : (
            <button type='button' className='Certi_email_btn'>
              재발신
            </button>
          )}
          {messages.email && <span>{messages.email}</span>}
        </div>
        {send && (
          <div className='Certi_email_Num'>
            <input
              type='number'
              className='input_certi_email_Num'
              name='Certi_num'
              placeholder='인증번호 입력'
              value=''
            />
            <span className='Certi_Timer'>{remainTime}</span>
            <button
              style={{ marginLeft: '69px' }}
              className='Certi_email_btn'
              type='button'
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
    </div>
  );
};

export default Register;
