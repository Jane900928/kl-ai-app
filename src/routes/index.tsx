import Loading from '@components/common/Loading';
import PageNotFoundView from '@components/common/PageNotFoundView';
import MainLayout from '@layouts/Layout';
import DappTest from '@pages/DappTest';
import Home from '@pages/Home';
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
const Layout = () => (
  <Suspense fallback={<Loading />}>
    <MainLayout />
  </Suspense>
);

//懒加载
// const Test = lazy(() => import('@components/test/Index'));

const Routes: RouteObject[] = [];

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    { path: 'dapp', element: <DappTest /> },
    { path: '/', element: <Home /> },
    { path: '404', element: <PageNotFoundView /> },
  ],
};

const notFoundRoute: RouteObject = {
  path: '*',
  element: <PageNotFoundView />,
};

Routes.push(mainRoutes, notFoundRoute);

export default Routes;
