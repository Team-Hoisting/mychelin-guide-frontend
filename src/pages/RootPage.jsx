import React from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { check } from '../api/auth';
import { Header, SideBanner, LogInBanner } from '../components/common';
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
        console.log(e);
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
      {/* {!user ? <LogInBanner /> : <SideBanner />} */}

      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default RootPage;
