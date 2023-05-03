import React from 'react';
import { SkinnyContainer } from '../components/common';
import { Categories, InfiniteStoreList } from '../components/main';
import { useFetchStores } from '../hooks';

const MainPage = () => {
  const { data, fetchNextPage, hasNextPage } = useFetchStores();

  return (
    <SkinnyContainer>
      <Categories />
      <InfiniteStoreList data={data} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
    </SkinnyContainer>
  );
};

export default MainPage;
