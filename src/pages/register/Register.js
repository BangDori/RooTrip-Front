import React, { useEffect, useRef, useState } from 'react';
import '@styles/register/register.scss';
import Checkbox from './Checkbox';

const Register = ({ form, messages, onInput, onCheck, onRegister }) => {
  const { name, email, nickname, password, gender, cpassword } = form;
  const [service, setService] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const refName = useRef(null);
  const [sendemail, setSendemail] = useState(false);
  const [minutes, setMinutes] = useState(parseInt(3));
  const [seconds, setSeconds] = useState(parseInt(0));
  useEffect(() => {
    refName.current.focus();
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);
  return (
    <form className='Register_main' onSubmit={onRegister}>
      <div className='User_data'>
        <div className='User_data_name'>
          <span>성명</span>
          <span>email</span>
          {sendemail && <span>email 인증 번호</span>}
          <span>닉네임</span>
          <span>비밀번호</span>
          <span>비밀번호 확인</span>
        </div>
        <div className='User_data_content'>
          <div className='Name'>
            <input
              ref={refName}
              type='text'
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
                  style={{
                    background: `${gender === 'M' ? '#0c4fc7' : 'white'}`,
                    color: `${gender === 'M' ? 'white' : 'black'}`,
                    fontWeight: `${gender === 'M' ? 'bold' : ''}`,
                    width: `${gender === 'M' ? '50px' : '45px'}`,
                    height: `${gender === 'M' ? '50px' : '45px'}`,
                  }}
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
                  style={{
                    background: `${gender === 'W' ? '#0c4fc7' : 'white'}`,
                    color: `${gender === 'W' ? 'white' : 'black'}`,
                    fontWeight: `${gender === 'W' ? 'bold' : ''}`,
                    width: `${gender === 'W' ? '50px' : '45px'}`,
                    height: `${gender === 'W' ? '50px' : '45px'}`,
                  }}
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
            {!sendemail ? (
              <button
                type='button'
                className='Certi_email_btn'
                onClick={setSendemail}
              >
                인증하기
              </button>
            ) : (
              <button type='button' className='Certi_email_btn'>
                재발신
              </button>
            )}
          </div>
          <div className='Certi_email_Num'>
            {sendemail && (
              <input
                type='number'
                className='input_certi_email_Num'
                name='Certi_num'
                placeholder='인증번호 입력'
                value=''
              ></input>
            )}
            {sendemail && (
              <span className='Certi_Timer'>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </span>
            )}
            {sendemail && (
              <button
                style={{ marginLeft: '69px' }}
                className='Certi_email_btn'
                type='button'
              >
                인증하기
              </button>
            )}
          </div>
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
      <div className='check_assign'>
        <Checkbox checked={service} onChange={setService}>
          <span>(필수) 서비스 이용약관</span>
        </Checkbox>
        <Checkbox checked={marketing} onChange={setMarketing}>
          <span>(선택) 개인정보 이용</span>
        </Checkbox>
        <div className='signbtn'>
          <button
            type='submit'
            className={service ? 'check_btn' : 'Ncheck_btn'}
            disabled={!service}
          >
            가입하기
          </button>
        </div>
      </div>
      {messages.axiosError && (
        <span style={{ color: 'red' }}>{messages.axiosError}</span>
      )}
    </form>
  );
};

export default Register;
