import React, { useCallback, useState } from 'react';
import RegisterCheckBox from '@components/register/RegisterCheckBox';

const RegisterButton = () => {
  const [checkBox, setCheckBox] = useState({
    service: false,
    marketing: false,
  });
  const { service, marketing } = checkBox;

  const onChecked = useCallback((e) => {
    setCheckBox((checkBox) => ({
      ...checkBox,
      [e.target.name]: e.target.checked,
    }));
  }, []);

  return (
    <div className='check_assign'>
      <RegisterCheckBox name='service' checked={service} onChange={onChecked}>
        <span>(필수) 서비스 이용약관</span>
      </RegisterCheckBox>
      <RegisterCheckBox
        name='marketing'
        checked={marketing}
        onChange={onChecked}
      >
        <span>(선택) 개인정보 이용</span>
      </RegisterCheckBox>
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
  );
};

export default RegisterButton;
