import React from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { check } from '../api/auth';
import { Header, Footer, SideBanner, Loader } from '../components/common';
import { userState } from '../recoil/atoms';

const RootPage = () => {
  const [user, setUser] = useRecoilState(userState);
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
      {user && <SideBanner />}
      <React.Suspense fallback={<Loader />}>
        <Outlet />
      </React.Suspense>
      <Footer />
    </>
  );
};

export default RootPage;
