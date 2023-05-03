import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { searchInputState } from '../../recoil/atoms';
import { ScrollObserver } from '../common';
import { StoreItemOnHover, NoResultMessage, StoreItem } from '.';
import { useFetchStores } from '../../hooks';

const StoresContainer = styled.div`
  padding: 20px;
`;

const TopStoresContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;

const RestStoresContainer = styled.div`
  margin-top: 20px;
  grid-gap: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const StoreItemContainer = styled.div`
  overflow: hidden;
  height: 360px;
  background-color: #fff;
  color: #22272e;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 30px;
  position: relative;
  transition: 0.1s ease-in-out;

  border: 2px solid var(--border-secondary);

  :hover {
    scale: 1.02;
  }

  :hover > main {
    transition: 0.1s ease-in-out;
    background-color: rgba(0, 0, 0, 0.8);

    div {
      display: flex;
    }

    img {
      display: block;
    }
  }

  :before {
    ${({ place }) =>
      place &&
      `
      content: '';
      position: absolute;
      z-index: 3;
      top: 5px;
      background-image: url('/medals/${place}-medal.png');
      background-size: 80px;
      background-repeat: no-repeat;
      width: 100px; 
      height: 200px;
    `}
  }
`;

const InfiniteStoreList = () => {
  const { data, fetchNextPage, hasNextPage } = useFetchStores();
  const searchedStores = data.pages.flat();
  const [topThree, remaining] = [searchedStores.slice(0, 3), searchedStores.slice(3)];
  const searchedInput = useRecoilValue(searchInputState);
  const displayedStores = searchedInput ? { topThree: [], remaining: searchedStores } : { topThree, remaining };

  return (
    <>
      {searchedInput && !displayedStores.remaining.length ? (
        <NoResultMessage />
      ) : (
        <StoresContainer>
          <TopStoresContainer>
            {displayedStores.topThree.map(
              ({ storeId, storeName, votesByCategory, address, voteCntArr, starsCount }, idx) => (
                <StoreItemContainer key={storeId} place={idx + 1}>
                  <StoreItemOnHover storeId={storeId} storeName={storeName} address={address} />
                  <StoreItem
                    key={storeId}
                    storeId={storeId}
                    storeName={storeName}
                    votesByCategory={votesByCategory}
                    voteCntArr={voteCntArr}
                    starCount={starsCount}
                  />
                </StoreItemContainer>
              )
            )}
          </TopStoresContainer>
          <RestStoresContainer>
            {displayedStores.remaining.map(
              ({ storeId, storeName, votesByCategory, voteCntArr = { voteCntArr }, starsCount }) => (
                <StoreItemContainer key={`${Math.random() * Math.random()}_${storeId}`}>
                  <StoreItemOnHover storeId={storeId} />
                  <StoreItem
                    storeId={storeId}
                    storeName={storeName}
                    votesByCategory={votesByCategory}
                    voteCntArr={voteCntArr}
                    starCount={starsCount}
                  />
                </StoreItemContainer>
              )
            )}
          </RestStoresContainer>
          {hasNextPage && <ScrollObserver fetchNextPage={fetchNextPage} />}
        </StoresContainer>
      )}
    </>
  );
};

export default InfiniteStoreList;
