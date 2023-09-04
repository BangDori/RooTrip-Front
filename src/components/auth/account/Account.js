import { Link } from 'react-router-dom';

import AccountForm from './AccountForm';

const Account = ({ error, isSubmitting }) => {
  return (
    <>
      <p className='description'>비밀번호를 잊으셨나요?</p>

      <AccountForm error={error} isSubmitting={isSubmitting} />

      <p className='link-text'>
        계정이 없으신가요? <Link to='/auth/signup'>회원가입</Link>
      </p>
    </>
  );
};

export default Account;
