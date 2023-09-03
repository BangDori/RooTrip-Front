import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/Error';
import LoginPage from './pages/Login';

import AuthLayout from './pages/AuthLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
