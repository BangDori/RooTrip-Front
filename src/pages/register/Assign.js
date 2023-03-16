import React, { useCallback, useState } from 'react';
import Checkbox from './Checkbox';

const Assign = () => {
  const [checkBox, setCheckBox] = useState({
    service: false,
    marketing: false,
  });
  const { service, marketing } = checkBox;

  const onClickCheckBox = useCallback(
    (e) => {
      setCheckBox({
        ...checkBox,
        [e.target.name]: e.target.checked,
      });
    },
    [checkBox],
  );

  return (
    <div className='check_assign'>
      <Checkbox name='service' checked={service} onChange={onClickCheckBox}>
        <span>(필수) 서비스 이용약관</span>
      </Checkbox>
      <Checkbox name='marketing' checked={marketing} onChange={onClickCheckBox}>
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
  );
};

export default React.memo(Assign);
