import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { check } from '../api/auth';
import { Header, Footer, SideBanner, LogInBanner } from '../components/common';
import { userState } from '../recoil/atoms';

const RootPage = () => {
  const [user, setUser] = useRecoilState(userState);
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
      {!user ? <LogInBanner /> : <SideBanner />}

      <div id="detail">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootPage;
