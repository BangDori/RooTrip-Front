import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from '@pages/RootLayout';
import ErrorPage from '@pages/ErrorPage';
import LoginPage, { action as loginAction } from '@pages/root/LoginPage';
import TripPage from '@pages/root/TripPage';

import AuthLayout from '@pages/AuthLayout';
import SignUpPage, { action as signupAction } from '@pages/auth/SignUpPage';
import AccountPage, { action as accountAction } from '@pages/auth/AccountPage';

import { loader as socialLoginLoader } from '@pages/social/SocialLogin';

import { loader as logoutLoader } from '@pages/logout/Logout';
import {
  tokenLoader,
  restrictAccessWithNoToken,
  restrictAccessWithToken,
} from '@utils/token';

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <LoginPage />,
        loader: restrictAccessWithToken,
        action: loginAction,
      },
      {
        path: 'trip',
        element: <TripPage />,
        loader: restrictAccessWithNoToken,
        children: [
          {
            path: ':postId',
          },
        ],
      },
      {
        path: 'profile',
        loader: restrictAccessWithNoToken,
        children: [
          {
            path: ':userId',
          },
          {
            path: 'edit',
          },
        ],
      },
      {
        path: 'route',
        loader: restrictAccessWithNoToken,
      },
      {
        path: 'write',
        loader: restrictAccessWithNoToken,
        children: [
          {
            path: '1',
          },
          {
            path: '2',
          },
          {
            path: '3',
          },
        ],
      },
    ],
  },
  {
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
  },
  {
    path: 'oauth/:provider/*',
    loader: socialLoginLoader,
  },
  {
    path: '/logout',
    loader: logoutLoader,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
