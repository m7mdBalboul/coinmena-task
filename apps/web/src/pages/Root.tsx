import React from 'react';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import { Outlet } from 'react-router-dom';
import * as Layout from 'components/layout';
import { Loader } from '@crypto/design-system';
import { globalCssSheet } from '../globalStyles';

const Login = React.lazy(() => import('pages/login'));

globalCssSheet();

function Root() {
  return (
    <Layout.Container>
      <Header />
      <Sidebar />
      <Layout.Main as={'main'}>
        <React.Suspense fallback={<Loader />}>
          <Outlet />
          <Login />
        </React.Suspense>
      </Layout.Main>
    </Layout.Container>
  );
}

export default Root;
