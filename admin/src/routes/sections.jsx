import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

const IndexPage = lazy(() => import('src/pages/app'));
const BlogPage = lazy(() => import('src/pages/blog'));
const UserPage = lazy(() => import('src/pages/user'));
const LoginPage = lazy(() => import('src/pages/login'));
const ProductsPage = lazy(() => import('src/pages/products'));
const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    { element: <LoginPage />, index: true },
    {

      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
    
      children: [
      
        { path: 'dashboard', element: <IndexPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'hotels', element: <ProductsPage /> },
       
      ],
    },
    {
      path: 'login',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: '404',
      element: (
     
          <Page404 />
    
      ),
    },
    {
      path: '/login',
      element: <Navigate to="/login" replace />,
    },
   
  ]);

  return routes;
}
