import { useCallback, useState } from 'react';
import useInitialState from '@hooks/useInitialState';
import ProfileTest from '@assets/naver.png';
import { changeNickname, changeSex, changePassword } from '@services/auth';

const Modify = ({ accessToken }) => {
  // 닉네임
  const [nickForm, setNickForm, resetNickForm] = useInitialState({
    nickname: '',
  });
  const { nickname } = nickForm;
  // 성별
  const [sexForm, setSexForm, resetSexForm] = useInitialState({
    gender: '',
  });
  const { gender } = sexForm;
  // 비밀번호 확인
  const [
    passwordConfirmForm,
    setPasswordConfirmForm,
    resetPasswordConfirmForm,
  ] = useInitialState({
    passwordConfirm: 'passwordConfirm',
  });
  // 비민번호
  const [passwordForm, setPasswordForm, resetPasswordForm] = useInitialState({
    password: 'password',
  });
  const { password } = passwordForm;
  const { passwordConfirm } = passwordConfirmForm;

  // 비밀번호 일치 상태 검사 메세지
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  // 비밀번호 유호성 검사
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  // 닉네임 입력
  const onInput = useCallback(
    (e) => {
      setNickForm((prevForm) => ({
        ...prevForm,
        [e.target.name]: e.target.value,
      }));
    },
    [setNickForm],
  );
  // 성별 입력
  const onSex = useCallback(
    (e) => {
      setSexForm((prevForm) => ({
        ...prevForm,
        [e.target.name]: e.target.value,
      }));
    },
    [setSexForm],
  );
  // 비밀 번호 입력
  const onPassword = useCallback(
    (e) => {
      setPasswordForm((prevForm) => ({
        ...prevForm,
        [e.target.name]: e.target.value,
      }));
    },
    [setPasswordForm],
  );
  // 비밀번호 확인 입력
  const onPasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirmForm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호가 일치합니다!');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage('비밀번호가 다릅니다!');
        setIsPasswordConfirm(false);
      }
    },
    [password, setPasswordConfirmForm],
  );
  // 닉네임 form 통신
  const nicknameChange = useCallback(
    async (nicknameForm) => {
      try {
        const nicknameToken = await changeNickname(nicknameForm, accessToken);
        alert('닉네임 변경 성공');
      } catch (e) {
        alert('닉네임 변경 실패');
      }
    },
    [accessToken],
  );
  // 성별 form 통신
  const sexChange = useCallback(
    async (sexform) => {
      try {
        const sexToken = await changeSex(sexform, accessToken);
        alert('성별 변경 성공');
      } catch (e) {
        alert('성별 변경 실패');
      }
    },
    [accessToken],
  );
  // 비밀번호 form 통신
  const passwordChange = useCallback(
    async (passwordform) => {
      try {
        const passwordToken = await changePassword(passwordform, accessToken);
        alert('비밀번호 변경 성공');
      } catch (e) {
        alert('비밀번호 변경 실패');
      }
    },
    [accessToken],
  );
  // 닉네임 form 상태 입력
  const handleSubmitNickname = useCallback(
    (e) => {
      // 페이지 이동 막기
      e.preventDefault();

      // changeNickName함수로 전달
      nicknameChange(nickForm);

      // form 상태 초기화
      resetNickForm();
    },
    [nickForm, nicknameChange, resetNickForm],
  );
  // 성별 form 상태 입력
  const handleSubmitSex = useCallback(
    (e) => {
      // 페이지 이동 막기
      e.preventDefault();

      // sexChange함수로 전달
      sexChange(sexForm);

      // form 상태 초기화
      resetSexForm();
    },
    [sexForm, sexChange, resetSexForm],
  );
  // 비밀번호 form 상태 입력
  const handleSubmitPassword = useCallback(
    (e) => {
      // 페이지 이동 막기
      e.preventDefault();

      // sexChange함수로 전달
      passwordChange(passwordForm);

      // form 상태 초기화
      resetSexForm();
    },
    [passwordForm, passwordChange, resetSexForm],
  );
  return (
    <>
      <div className='modifyBox'>
        <div className='modifyProfile'>
          <div className='modifyTitle'>
            <img src={ProfileTest} alt='Test' />
          </div>
          <div className='modifyContent'>
            <div style={{ display: 'flex' }}>
              <span>닉네임</span>
              <form method='post' onSubmit={handleSubmitNickname}>
                <input
                  type='text'
                  name='nickname'
                  className='inputNickName'
                  value={nickname}
                  onChange={onInput}
                />
                <button type='submit'>변경</button>
              </form>
            </div>
            <div className='changeProfile'>
              <span>프로필 사진 변경</span>
            </div>
          </div>
        </div>
        <div className='modifyIntroduction'>
          <div className='modifyTitle'>
            <span>소개글</span>
          </div>
          <div className='modifyContent'>
            <textarea rows='8' cols='50'></textarea>
          </div>
        </div>
        <div className='modifySex'>
          <div className='modifyTitle'>
            <span>성별</span>
          </div>
          <form
            method='post'
            onSubmit={handleSubmitSex}
            className='modifyContent'
          >
            <input
              type='radio'
              name='gender'
              value='M'
              className='radioBtn'
              onClick={onSex}
            />
            <label>남자</label>
            <input
              type='radio'
              name='gender'
              value='G'
              className='radioBtn'
              onClick={onSex}
            />
            <label>여자</label>
            <button type='submit'>변경</button>
          </form>
        </div>
        <div className='modifyPw'>
          <div className='modifyTitle'>
            <span>비밀번호 변경</span>
          </div>
          <form
            className='modifyContent'
            method='post'
            onSubmit={handleSubmitPassword}
          >
            <input
              type='password'
              name='password'
              placeholder='새로운 비밀번호'
              style={{ marginTop: '15px' }}
              onChange={onPassword}
            />
            <div style={{ marginTop: '15px' }}>
              <input
                type='password'
                name='passwordConfirm'
                placeholder='새로운 비밀번호 검사'
                onChange={onPasswordConfirm}
              />
              <button
                type='submit'
                style={{ marginLeft: '20px' }}
                disabled={`${isPasswordConfirm ? '' : 'true'}`}
              >
                변경
              </button>
              {passwordConfirmForm.length > 0 && (
                <span
                  className={`message ${
                    isPasswordConfirm ? 'success' : 'error'
                  }`}
                >
                  {passwordConfirmMessage}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modify;
