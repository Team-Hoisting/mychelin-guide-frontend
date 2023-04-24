import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { check } from '../api/auth';
import { Header } from '../components/common';
import { userState } from '../recoil/atoms';
import SideBanner from '../components/common/SideBanner';

const RootPage = () => {
  const setUser = useSetRecoilState(userState);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const user = await check();
        console.log(user);

        setUser(user);
      } catch (e) {
        console.log(e);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) <></>;

  return (
    <>
      <Header />
      <SideBanner />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default RootPage;
