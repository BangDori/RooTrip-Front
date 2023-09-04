import { Link } from 'react-router-dom';

import SignUpForm from './SignUpForm';

const SignUp = ({ error, isSubmitting }) => {
  return (
    <>
      <p className='description'>
        당신의 이야기를 여행을 <span>기록</span>하고 <span>공유</span>하세요
      </p>

      <SignUpForm error={error} isSubmitting={isSubmitting} />

      <p className='link-text'>
        계정이 이미 있으신가요? <Link to='/'>로그인</Link>
      </p>
    </>
  );
};

export default SignUp;
