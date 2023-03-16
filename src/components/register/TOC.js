import React from 'react';
import { useSelector } from 'react-redux';

const TOC = () => {
  const emailAuth = useSelector((state) => state.emailAuth);

  return (
    <div className='User_data_name'>
      <span>성명</span>
      <span>email</span>
      {emailAuth && <span>email 인증 번호</span>}
      <span>닉네임</span>
      <span>비밀번호</span>
      <span>비밀번호 확인</span>
    </div>
  );
};

export default React.memo(TOC);
