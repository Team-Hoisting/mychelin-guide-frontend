import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import searchInputState from '../recoil/atoms/searchInputState';
import { fetchStores } from '../api/stores';
import { StoreItem } from '../components/common';
import { StoreItemOnHover, Categories } from '../components/main';

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

const filterFetchedStores = (stores, category, searchInput) => {
  const filteredByCategory =
    category === 'AL00'
      ? stores
      : stores.filter(({ votesByCategory }) => Object.keys(votesByCategory).includes(category));

  const filteredByUserSearch = !searchInput.length
    ? filteredByCategory
    : filteredByCategory.filter(({ storeName }) => storeName.includes(searchInput));

  return filteredByUserSearch;
};

const MainPage = () => {
  const [displayedStores, setDisplayedStores] = React.useState({ topThree: [], remaining: [] });
  const [category, setCategory] = React.useState('AL00');
  const searchInput = useRecoilValue(searchInputState);

  React.useEffect(() => {
    (async () => {
      try {
        const allStores = await fetchStores();
        const filteredStores = filterFetchedStores(allStores, category, searchInput);

        setDisplayedStores({ topThree: filteredStores.splice(0, 3), remaining: filteredStores.splice(0, 10) });
      } catch (e) {
        console.log('[Main Page Error]: ', e);
      }
    })();
  }, [category, searchInput]);

  const changeCategory = newCategory => {
    setCategory(newCategory);
  };

  return (
    <>
      <Categories category={category} changeCategory={changeCategory} />
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
              <StoreItemContainer key={storeId}>
                <StoreItemOnHover storeId={storeId} />
                <StoreItem key={storeName} storeName={storeName} imgUrl={imgUrl} votesByCategory={votesByCategory} />
              </StoreItemContainer>
            ))}
          </RestStoresContainer>
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
