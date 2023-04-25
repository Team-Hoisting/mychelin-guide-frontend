import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RootPage from './pages/RootPage';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import SigninPage from './pages/SigninPage';
import ErrorPage from './pages/ErrorPage';
import SearchMapPage from './pages/SearchMapPage';
import StoreDetailPage, { storeDetailLoader } from './pages/StoreDetailPage';
import ProfilePage from './pages/ProfilePage';
import UserInfoPage from './pages/UserInfoPage';
import RecommendationPage from './pages/RecommendationPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // default 3
      // suspense: true,
    },
    mutations: {
      // useErrorBoundary: true,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: 'signup',
        element: <RegisterPage />,
      },
      {
        path: 'signin',
        element: <SigninPage />,
      },
      {
        path: 'profile/:nickname',
        element: <ProfilePage />,
      },
      {
        path: 'searchmap',
        element: <SearchMapPage />,
      },
      {
        path: 'store/:id',
        element: <StoreDetailPage />,
        loader: storeDetailLoader(queryClient),
      },
      {
        path: 'userinfo/:id',
        element: <UserInfoPage />,
      },
      {
        path: 'recommendation/:id',
        element: <RecommendationPage />,
      },
    ],
  },
]);

const App = () => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </RecoilRoot>
);

export default App;
