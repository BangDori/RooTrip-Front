import { json, redirect, useActionData, useNavigation } from 'react-router-dom';

import SignUp from '@components/auth/signup/SignUp';
import { signupAPI } from '@services/auth';

const SignUpPage = () => {
  const error = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return <SignUp error={error} isSubmitting={isSubmitting} />;
};

export default SignUpPage;

export async function action({ request }) {
  const data = await request.formData();

  const authForm = {
    email: data.get('email'),
    name: data.get('name'),
    nickname: data.get('nickname'),
    password: data.get('password'),
  };

  const response = await signupAPI(authForm);
  const resData = await response.json();

  // 중복된 이메일
  if (!resData.status) {
    return json({ message: resData.message });
  }

  // 중복된 닉네임

  // 회원가입 성공
  return redirect('/');
}
