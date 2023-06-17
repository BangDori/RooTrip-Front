import { useCallback, useState, useRef } from 'react';

import ProfileTest from '@assets/social/naver.png';
import useInitialState from '@hooks/useInitialState';
import { changeNickname, changeSex, changePassword } from '@services/auth';
import { uploadProfileToS3 } from '@services/image';

const Modify = ({ accessToken }) => {
  const [nickForm, setNickForm, resetNickForm] = useInitialState({
    nickname: '',
  });
  const [sexForm, setSexForm, resetSexForm] = useInitialState({
    gender: '',
  });
  const [passwordForm, setPasswordForm, resetPasswordForm] = useInitialState({
    password: 'password',
  });
  const [
    passwordConfirmForm,
    setPasswordConfirmForm,
    resetPasswordConfirmForm,
  ] = useInitialState({
    passwordConfirm: 'passwordConfirm',
  });
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [profileForm, setProfileForm, resetProfileForm] = useInitialState({
    profile: [],
  });

  const fileInputRef = useRef(null);

  const { nickname } = nickForm;
  const { gender } = sexForm;
  const { password } = passwordForm;
  const { passwordConfirm } = passwordConfirmForm;
  const { profile } = profileForm;

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

  // 프로필 사진 선택
  const handleProfileChange = useCallback((e) => {
    fileInputRef.current.click();
  }, []);
  // 파일 선택 시 profileForm 업데이트
  const handleProfileFileChange = useCallback(
    (e) => {
      const files = Array.from(e.target.files); // 선택한 파일 객체를 배열로 변환
      setProfileForm((prevForm) => ({
        ...prevForm,
        profile: files,
      }));
    },
    [setProfileForm],
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

  // 프로필 사진 form 통신
  const profileChange = useCallback(
    async (profileform) => {
      // console.log(profileform);
      try {
        const profileToken = await uploadProfileToS3(profileform, accessToken);
        alert('프로필 사진 변경 성공');
      } catch (e) {
        alert('프로필 사진 변경 실패');
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

  // 프로필 사진 form 상태 입력
  const handleSubmitProfile = useCallback(
    (e) => {
      e.preventDefault();

      profileChange(profileForm);

      resetProfileForm();
    },
    [profileChange, profileForm, resetProfileForm],
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
              </form>
            </div>
            <form className='changeProfile' onSubmit={handleSubmitProfile}>
              {/* 파일 선택 창을 열기 위해 hidden으로 설정 */}
              <input
                ref={fileInputRef}
                type='file'
                name='profile'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleProfileFileChange}
              />
              <button type='button' onClick={handleProfileChange}>
                프로필 사진 변경
              </button>
              <button type='submit'>저장</button>
            </form>
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
