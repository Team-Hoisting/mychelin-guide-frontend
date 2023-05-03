import React from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ToastContainer } from 'react-toastify';
import { check } from '../api/auth';
import { Header, Footer, SideBanner, LogInBanner } from '../components/common';
import { userState, themeState } from '../recoil/atoms';

const RootPage = () => {
  const [user, setUser] = useRecoilState(userState);
  const [theme] = useRecoilState(themeState);
  const [isLoading, setIsLoading] = React.useState(false);

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

  if (isLoading) <></>;

  return (
    <>
      <Header />
      {!user ? <LogInBanner /> : <SideBanner />}

      <div id="detail">
        <Outlet />
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
      </div>

      <Footer />
    </>
  );
};

export default RootPage;
