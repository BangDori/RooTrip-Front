import { useCallback } from 'react';
import useInitialState from '@hooks/useInitialState';
import ProfileTest from '@assets/naver.png';
import { changeNickname, changeSex } from '@services/auth';

const Modify = ({ accessToken }) => {
  const [nickForm, setNickForm, resetNickForm] = useInitialState({
    nickname: '',
  });
  const { nickname } = nickForm;
  const [sexForm, setSexForm, resetSexForm] = useInitialState({
    gender: '',
  });
  const { gender } = sexForm;
  // form 상태 입력
  const onInput = useCallback(
    (e) => {
      setNickForm((prevForm) => ({
        ...prevForm,
        [e.target.name]: e.target.value,
      }));
    },
    [setNickForm],
  );
  const onSex = useCallback(
    (e) => {
      setSexForm((prevForm) => ({
        ...prevForm,
        [e.target.name]: e.target.value,
      }));
    },
    [setSexForm],
  );
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
  const sexChange = useCallback(
    async (sexform) => {
      try {
        const nicknameToken = await changeSex(sexform, accessToken);
        alert('성별 변경 성공');
      } catch (e) {
        alert('성별 변경 실패');
      }
    },
    [accessToken],
  );

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
          <div className='modifyContent'>
            <input type='text' name='nowPw' placeholder='현재 비밀번호' />
            <input
              type='text'
              name='newPw'
              placeholder='새로운 비밀번호'
              style={{ marginTop: '15px' }}
            />
            <div style={{ marginTop: '15px' }}>
              <input
                type='text'
                name='newPwCheck'
                placeholder='새로운 비밀번호 검사'
              />
              <button type='button' style={{ marginLeft: '20px' }}>
                변경
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modify;
