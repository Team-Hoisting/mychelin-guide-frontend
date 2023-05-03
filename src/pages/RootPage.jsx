import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ToastContainer } from 'react-toastify';
import { check } from '../api/auth';
import { Header, Footer, SideBanner, Loader } from '../components/common';
import { userState, themeState } from '../recoil/atoms';

const RootPage = () => {
  const [user, setUser] = useRecoilState(userState);
  const [theme] = useRecoilState(themeState);
  const [isLoading, setIsLoading] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const user = await check();
        setUser(user);
      } catch (e) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setUser]);

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  if (isLoading) <></>;

  return (
    <>
      <Header />
      {user && <SideBanner />}
      <React.Suspense fallback={<Loader />}>
        <Outlet />
      </React.Suspense>

      <ToastContainer
        className="toastContainer"
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme={theme}
      />
      <Footer />
    </>
  );
};

export default RootPage;
