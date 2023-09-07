import RootLayout from '@pages/RootLayout';
import ErrorPage from '@pages/ErrorPage';
import LoginPage, { action as loginAction } from '@pages/root/LoginPage';
import { loader as tripPostsLoader } from '@pages/root/TripPage';
import TripPostPage, {
  loader as tripPostLoader,
} from '@pages/root/TripPostPage';

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
  shouldRevalidate: ({ currentUrl }) => currentUrl.pathname === '/',
  children: [
    {
      index: true,
      element: <LoginPage />,
      loader: restrictAccessWithToken,
      action: loginAction,
    },
    {
      path: 'trip',
      loader: tripPostsLoader,
      children: [
        {
          path: ':postId',
          element: <TripPostPage />,
          loader: tripPostLoader,
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
