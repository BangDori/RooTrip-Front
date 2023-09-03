import { json, redirect, useActionData, useNavigation } from 'react-router-dom';

import Login from '@components/Login';
import { loginAPI } from '@services/auth';
import { setTokens } from '@utils/token';

const LoginPage = () => {
  const error = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return <Login error={error} isSubmitting={isSubmitting} />;
};

export default LoginPage;

export async function action({ request }) {
  const data = await request.formData();

  const authForm = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const response = await loginAPI(authForm);
  const resData = await response.json();

  // 로그인 오류
  if (!resData.status) {
    return json({ message: resData.message });
  }

  // 로그인 성공
  const { accessToken, refreshToken, expire } = resData.data;
  setTokens(accessToken, refreshToken, expire);

  return redirect('/trip');
}
