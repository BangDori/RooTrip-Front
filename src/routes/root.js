import RootLayout, { loader as initLoader } from '@pages/RootLayout';
import ErrorPage from '@pages/ErrorPage';
import LoginPage, { action as loginAction } from '@pages/root/LoginPage';
import { loader as tripPostsLoader } from '@pages/root/TripPage';
import TripPostPage, {
  loader as tripPostLoader,
} from '@pages/root/TripPostPage';
import WritePage, { action as writeAction } from '@pages/root/WritePage';

import {
  restrictAccessWithNoToken,
  restrictAccessWithToken,
} from '@utils/token';
import CompletionPage from '@pages/root/CompletionPage';

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
          index: true,
          element: <WritePage />,
          action: writeAction,
        },
        {
          path: 'completion',
          element: <CompletionPage />,
        },
      ],
    },
  ],
};

export default root;
