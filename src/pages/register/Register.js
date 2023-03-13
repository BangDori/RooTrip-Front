import React, { useEffect, useRef } from 'react';
import '@styles/register/register.scss';
import { Link } from 'react-router-dom';
const Register = ({ form, messages, onInput, onCheck, onRegister }) => {
  const { name, email, nickname, password, gender, cpassword } = form;

  const refName = useRef(null);

  useEffect(() => {
    refName.current.focus();
  }, []);

  return (
    <form className='Register_main' onSubmit={onRegister}>
      <div className='User_data'>
        <div className='User_data_name'>
          <span>성명</span>
          <span>email</span>
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
          <div>
            <input
              type='text'
              name='email'
              value={email}
              onChange={onInput}
              onBlur={(e) => onCheck(e.target.name, e.target.value)}
              placeholder='email을 입력해주세요'
            />
            {messages.email && <span>{messages.email}</span>}
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
        {/* 필수 누르면 가입하기 버튼 활성화 원래는 활성화 x -> 이거 내가 만들거 */}
        <label>
          <input type='checkbox' name='checkbox' />
          <span>통합 서비스 이용약관 (동의)</span>
        </label>
        <label>
          <input type='checkbox' name='' value='' />
          <span>개인정보 이용 (선택)</span>
        </label>
        <div className='signbtn'>
          <Link to = './certificationemail'>
          <button type='submit'>가입하기</button>
          </Link>
        </div>
      </div>
      {messages.axiosError && (
        <span style={{ color: 'red' }}>{messages.axiosError}</span>
      )}
    </form>
  );
};

export default Register;
