import React from 'react';
import styled from 'styled-components';
import fetchStores from '../api/stores';
// import fetchVotes from '../api/votes';
import { StoreItem } from '../components/common';
import Categories from '../components/main/Categories';
import StoreItemOnHover from '../components/main/StoreItemOnHover';

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
  /* width: ${({ topThree }) => (topThree ? '30%' : '100%')}; */
  width: ${({ topThree }) => (topThree ? '400px' : '290px')};
  min-width: ${({ topThree }) => (topThree ? '400px' : '290px')};
  overflow: hidden;
  height: 350px;
  background-color: #fff;
  border: 1px solid red;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
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

const MainPage = () => {
  const [stores, setStores] = React.useState([]);
  const [topStores, setTopStores] = React.useState([]);
  const [category, setCategory] = React.useState('AL00');

  console.log('현재 카테고리:', category);

  React.useEffect(() => {
    (async () => {
      try {
        const stores = await fetchStores();
        // const votes = await fetchVotes();

        setTopStores(stores.splice(0, 3));
        setStores(stores.splice(0, 10));
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const changeCategory = newCategory => {
    setCategory(newCategory);
  };

  return (
    <>
      <Categories category={category} changeCategory={changeCategory} />
      <StoresContainer>
        <TopStoresContainer>
          {topStores.map(({ storeId, storeName, imgUrl }) => (
            <StoreItemContainer key={storeId} topThree>
              <StoreItemOnHover storeId={storeId} />
              <StoreItem key={storeName} storeName={storeName} imgUrl={imgUrl} />
            </StoreItemContainer>
          ))}
        </TopStoresContainer>
        <RestStoresContainer>
          {stores.map(({ storeId, storeName, imgUrl }) => (
            <StoreItemContainer key={storeId}>
              <StoreItemOnHover storeId={storeId} />
              <StoreItem key={storeName} storeName={storeName} imgUrl={imgUrl} />
            </StoreItemContainer>
          ))}
        </RestStoresContainer>
      </StoresContainer>
    </>
  );
};

export default MainPage;
