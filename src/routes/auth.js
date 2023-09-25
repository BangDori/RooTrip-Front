import AuthLayout from '@pages/AuthLayout';
import SignUpPage, { action as signupAction } from '@pages/auth/SignUpPage';
import AccountPage, { action as accountAction } from '@pages/auth/AccountPage';

import { restrictAccessWithToken } from '@utils/token';

const auth = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    {
      path: 'signup',
      element: <SignUpPage />,
      loader: restrictAccessWithToken,
      action: signupAction,
    },
    {
      path: 'account',
      element: <AccountPage />,
      loader: restrictAccessWithToken,
      action: accountAction,
    },
  ],
};

export default auth;
