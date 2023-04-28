import React from 'react';
import styled from 'styled-components';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import { ResultItem, ResultItemOnHover } from '.';
import useMapwithMarkers from '../../hooks/useMapwithMarkers';

const resultCodes = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
};

const Container = styled.div`
  position: relative;
`;

const MapContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 5rem);
  z-index: 1;
  position: relative;
`;

const ResultListContainer = styled.div`
  position: absolute;
  padding: 10px;
  height: 100%;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  z-index: 1;
`;

const ResultList = styled.ul`
  margin: auto;
  padding: 10px;
  height: fit-content;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

const ResultItemContainer = styled.li`
  position: relative;
  width: 100%;
  height: 110px;
  background-color: #fff;

  overflow: hidden;

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

const ButtonContainer = styled.div`
  margin: 0 auto;
  width: 30px;
  height: 30px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  text-align: center;
  color: white;

  ${({ hasPage }) => !hasPage && 'visibility: hidden;'}
`;

const PreviousPageBtn = ({ hasPrevPage, clickHandler }) => (
  <>
    <ButtonContainer onClick={clickHandler} hasPage={hasPrevPage}>
      <RiArrowUpSLine />
    </ButtonContainer>
  </>
);

const NextPageBtn = ({ hasNextPage, clickHandler }) => (
  <>
    <ButtonContainer onClick={clickHandler} hasPage={hasNextPage}>
      <RiArrowDownSLine />
    </ButtonContainer>
  </>
);

const Result = ({ result, paginationRef }) => {
  const mapContainerRef = useMapwithMarkers(result);

  const gotoPreviousPage = () => {
    if (paginationRef.current.hasPrevPage) paginationRef.current.prevPage();
  };

  const gotoNextPage = () => {
    if (paginationRef.current.hasNextPage) paginationRef.current.nextPage();
  };

  console.log(result);

  return (
    <Container>
      <MapContainer ref={mapContainerRef} />
      {result.length && (
        <ResultListContainer>
          <PreviousPageBtn clickHandler={gotoPreviousPage} hasPrevPage={paginationRef.current?.hasPrevPage} />
          <ResultList>
            {result.map(({ id, place_name: storeName, road_address_name: address, phone }, idx) => (
              <ResultItemContainer key={id}>
                <ResultItemOnHover storeId={id} />
                <ResultItem
                  key={id}
                  currentIdx={resultCodes[idx]}
                  storeName={storeName}
                  address={address}
                  phoneNumber={phone}
                />
              </ResultItemContainer>
            ))}
          </ResultList>
          <NextPageBtn clickHandler={gotoNextPage} hasNextPage={paginationRef.current?.hasNextPage} />
        </ResultListContainer>
      )}
    </Container>
  );
};

export default Result;
