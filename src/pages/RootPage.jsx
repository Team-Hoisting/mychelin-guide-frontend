import React from 'react';
import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { check } from '../api/auth';
import userState from '../recoil/atoms/userState';
import queryKey from '../constants/userQueryKey';
import Header from '../components/common/Header';
import StoreItemOnHover from '../components/common/StoreItemOnHover';

const RootPage = () => {
  const setUser = useSetRecoilState(userState);
  const { isLoading } = useQuery({
    queryKey,
    queryFn: check,
    onError() {
      setUser(null);
    },
  });

  if (isLoading) <></>;

  return (
    <>
      <Header />
      <StoreItemOnHover />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default RootPage;
