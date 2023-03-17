import React from 'react';

const TOC = () => {
  return (
    <div className='User_data_name'>
      <span>성명</span>
      <span>email</span>
      <span>닉네임</span>
      <span>비밀번호</span>
      <span>비밀번호 확인</span>
    </div>
  );
};

export default React.memo(TOC);
