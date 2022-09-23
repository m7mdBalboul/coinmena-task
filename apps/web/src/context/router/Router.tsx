import React from 'react';
import Root from 'pages/Root';
import { withQueryClient } from 'context/query';
import { ProtectedRoute } from './ProtectedRoute';
import { loader as homeLoader } from 'pages/home';
import { loader as exchangeLoader } from 'pages/exchange';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

const Home = React.lazy(() => import('pages/home'));
const Error = React.lazy(() => import('pages/Error'));
const Exchange = React.lazy(() => import('pages/exchange'));

const routerUtils = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: 'home/*',
        loader: withQueryClient(homeLoader),
        element: <Home />,
      },
      {
        path: 'exchange/*',
        loader: withQueryClient(exchangeLoader),
        element: (
          <ProtectedRoute>
            <Exchange />
          </ProtectedRoute>
        ),
      },
      { path: '/', element: <Navigate to='/home' /> },
    ],
  },
]);

function Router() {
  return <RouterProvider router={routerUtils} />;
}

export { routerUtils, Router };
