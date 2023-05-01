import React from 'react';
import styled from 'styled-components';
import useArchivedInfiniteQuery from '../../hooks/useArchivedInfiniteQuery';
import { ScrollObserver } from '../common';
import ProfileStoreItem from './ProfileStoreItem';

const StoresGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const ArchivedStores = ({ profileUserNickname }) => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useArchivedInfiniteQuery(profileUserNickname);

  if (isLoading) return <></>;

  return (
    <>
      <StoresGrid>
        {data.pages.flat().map(({ storeId, storeName }) => (
          <ProfileStoreItem key={storeId} storeId={storeId} storeName={storeName} imgUrl={`/img/stores/${storeId}`} />
        ))}
      </StoresGrid>
      {hasNextPage && <ScrollObserver fetchNextPage={fetchNextPage} />}
    </>
  );
};

export default ArchivedStores;
