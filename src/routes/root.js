import RootLayout from '@pages/RootLayout';
import ErrorPage from '@pages/ErrorPage';
import LoginPage, { action as loginAction } from '@pages/root/LoginPage';
import TripPage from '@pages/root/TripPage';

import {
  tokenLoader,
  restrictAccessWithNoToken,
  restrictAccessWithToken,
} from '@utils/token';

const root = {
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
};

export default root;
