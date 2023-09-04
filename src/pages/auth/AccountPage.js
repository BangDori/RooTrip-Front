import { json, redirect, useActionData, useNavigation } from 'react-router-dom';

import Account from '@components/auth/account/Account';
import { resetPasswordAPI } from '@services/email';

const AccountPage = () => {
  const error = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return <Account error={error} isSubmitting={isSubmitting} />;
};

export default AccountPage;

export async function action({ request }) {
  const data = await request.formData();

  const accountForm = {
    email: data.get('email'),
    verifyNumber: data.get('verifyNumber'),
  };

  const response = await resetPasswordAPI(accountForm);
  const resData = await response.json();

  // 비밀번호 초기화 메일 전송실패
  if (!resData.status) {
    return json({ message: resData.message });
  }

  alert('초기화된 비밀번호를 메일로 전송하였습니다.');
  // 비밀번호 초기화 메일 전송 성공
  return redirect('/');
}
