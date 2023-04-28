import React from 'react';
import { Loader, SkinnyContainer } from '../components/common';
import { Categories, InfiniteStoreList } from '../components/main';
import { useFetchStores } from '../hooks';

const MainPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useFetchStores();

  return (
    <SkinnyContainer>
      <Categories />
      {isLoading ? (
        <Loader />
      ) : (
        <InfiniteStoreList data={data} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
      )}
    </SkinnyContainer>
  );
};

export default MainPage;
