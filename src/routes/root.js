import RootLayout, { loader as initLoader } from '@pages/RootLayout';
import ErrorPage from '@pages/ErrorPage';
import LoginPage, { action as loginAction } from '@pages/root/LoginPage';
import { loader as tripPostsLoader } from '@pages/root/TripPage';
import TripPostPage, {
  loader as tripPostLoader,
} from '@pages/root/TripPostPage';
import ProfileLayout from '@pages/root/ProfileLayout';
import ProfilePage from '@pages/root/ProfilePage';
import WritePage, { action as writeAction } from '@pages/root/WritePage';

import {
  restrictAccessWithNoToken,
  restrictAccessWithToken,
} from '@utils/token';

const root = {
  path: '/',
  id: 'root',
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  loader: initLoader,
  shouldRevalidate: ({ currentUrl, nextUrl }) =>
    currentUrl.pathname !== nextUrl.pathname,
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
      element: <ProfileLayout />,
      loader: restrictAccessWithNoToken,
      children: [
        {
          path: ':userId',
          element: <ProfilePage />,
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
      element: <WritePage />,
      action: writeAction,
    },
  ],
};

export default root;
