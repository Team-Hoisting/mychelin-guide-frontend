import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { Loader } from '@mantine/core';
import { searchInputState } from '../recoil/atoms';
// import { fetchStores } from '../api/stores';
import { StoreItem } from '../components/common';
import { StoreItemOnHover, Categories, ScrollObserver } from '../components/main';
import { useFetchStores } from '../hooks';

const StoresContainer = styled.div`
  padding: 20px;
`;

const TopStoresContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RestStoresContainer = styled.div`
  margin-top: 20px;
  grid-gap: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const StoreItemContainer = styled.div`
  overflow: hidden;
  height: 350px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 30px;
  position: relative;
  transition: 0.1s ease-in-out;

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
`;

const NoResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 500px;
`;

const SearchmapPageDirector = styled.span`
  font-style: italic;
  text-decoration: underline;
`;

const NoMatchingSearchInput = styled.span`
  font-weight: 700;
`;

// const filterFetchedStores = (stores, category, searchInput) => {
//   const filteredByCategory =
//     category === 'AL00'
//       ? stores
//       : stores.filter(({ votesByCategory }) => Object.keys(votesByCategory).includes(category));

//   const filteredByUserSearch = !searchInput.length
//     ? filteredByCategory
//     : filteredByCategory.filter(({ storeName }) => storeName.includes(searchInput));

//   return filteredByUserSearch;
// };

const MainPage = () => {
  const [displayedStores, setDisplayedStores] = React.useState({ topThree: [], remaining: [] });
  const searchInput = useRecoilValue(searchInputState);

  const { data, isLoading, fetchNextPage, hasNextPage } = useFetchStores();

  React.useEffect(() => {
    if (isLoading) return;

    const topThree = data.pages.flat().splice(0, 3);
    const remaining = data.pages.flat().splice(4);

    setDisplayedStores({ topThree, remaining });
  }, [isLoading, data]);

  return (
    <>
      <Categories />
      {displayedStores.topThree.length ? (
        <StoresContainer>
          <TopStoresContainer>
            {displayedStores.topThree.map(({ storeId, storeName, imgUrl, votesByCategory }) => (
              <StoreItemContainer key={storeId}>
                <StoreItemOnHover storeId={storeId} />
                <StoreItem key={storeId} storeName={storeName} imgUrl={imgUrl} votesByCategory={votesByCategory} />
              </StoreItemContainer>
            ))}
          </TopStoresContainer>
          <RestStoresContainer>
            {displayedStores.remaining.map(({ storeId, storeName, imgUrl, votesByCategory }) => (
              <StoreItemContainer key={`${Math.random() * Math.random()}_${storeId}`}>
                <StoreItemOnHover storeId={storeId} />
                <StoreItem storeName={storeName} imgUrl={imgUrl} votesByCategory={votesByCategory} />
              </StoreItemContainer>
            ))}
          </RestStoresContainer>
          {hasNextPage && <ScrollObserver fetchNextPage={fetchNextPage} />}
        </StoresContainer>
      ) : (
        <NoResultContainer>
          <p>
            <NoMatchingSearchInput>{`'${searchInput}'`}</NoMatchingSearchInput>에 해당하는 결과가 없습니다.
          </p>
          <Link to={`/searchmap?keyword=${searchInput}`}>
            <SearchmapPageDirector>새로운 가게를 추가하고 최초 투표자가 되어보세요!</SearchmapPageDirector>
          </Link>
        </NoResultContainer>
      )}
    </>
  );
};

export default MainPage;
