import { json, redirect, useActionData, useNavigation } from 'react-router-dom';

import Login from '@components/root/login/Login';
import store from '@store/configureStore';
import { loginStore } from '@store/user';
import { loginAPI } from '@services/auth';

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
    if (resData.message === '입력값이 유효하지 않습니다.')
      return json({ message: resData.message, status: 401 }); // 401, Authentication failed
    return json({ message: resData.message, status: 422 }); // 422, Invalid email or password entered
  }

  // 로그인 성공
  const tokens = resData.data;
  store.dispatch(loginStore(tokens));

  return redirect('/trip');
}
