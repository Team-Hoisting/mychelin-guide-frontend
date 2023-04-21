import React from 'react';
import styled from 'styled-components';
import fetchStores from '../api/stores';
// import fetchVotes from '../api/votes';
import { StoreItem } from '../components/common';
import Categories from '../components/main/Categories';

const StoresContainer = styled.div`
  padding: 20px;
  border: 2px dashed red;
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

const MainPage = () => {
  const [stores, setStores] = React.useState([]);
  const [topStores, setTopStores] = React.useState([]);

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

  return (
    <>
      <Categories />
      <StoresContainer>
        <TopStoresContainer>
          {topStores.map(({ storeName, imgUrl }) => (
            <StoreItem key={storeName} storeName={storeName} imgUrl={imgUrl} topThree />
          ))}
        </TopStoresContainer>
        <RestStoresContainer>
          {stores.map(({ storeName, imgUrl }) => (
            <StoreItem key={storeName} storeName={storeName} imgUrl={imgUrl} />
          ))}
        </RestStoresContainer>
      </StoresContainer>
    </>
  );
};

export default MainPage;
