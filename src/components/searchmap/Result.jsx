import React from 'react';
import styled from 'styled-components';

import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import { ResultItem, ResultItemOnHover } from '.';
import useMapwithMarkers from '../../hooks/useMapwithMarkers';

const Container = styled.div`
  position: relative;
  margin: 10px auto;
  width: fit-content;
`;

const MapContainer = styled.div`
  margin: auto;
  width: 900px;
  height: 400px;
  border-radius: 30px;
`;

const ResultListContainer = styled.div`
  position: absolute;
  padding: 0;
  height: fit-content;
  top: 0;
  right: 0;
  z-index: 999;
`;

const ResultList = styled.ul`
  margin: auto;
  padding: 0;
  height: fit-content;
  border-radius: 20px;
`;

const ResultItemContainer = styled.li`
  position: relative;
  margin: 13px;
  width: 250px;
  height: 100px;
  background-color: white;
  opacity: 0.9;
  border-radius: 20px;
  box-shadow: 3px 3px 3px #ababab;
  list-style: none;
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
  margin: 5px auto;
  width: 20px;
  height: 20px;
  background-color: var(--primary-color);
  border-radius: 50%;
  text-align: center;
  color: white;

  ${props => !props.hasPage && 'visibility: hidden;'}
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

  return (
    <Container>
      <MapContainer ref={mapContainerRef} />
      <ResultListContainer>
        <PreviousPageBtn clickHandler={gotoPreviousPage} hasPrevPage={paginationRef.current?.hasPrevPage} />
        <ResultList>
          {result.map(({ id, place_name: storeName, road_address_name: address, phone }) => (
            <ResultItemContainer key={id}>
              <ResultItemOnHover storeId={id} />
              <ResultItem key={id} storeName={storeName} address={address} phoneNumber={phone} />
            </ResultItemContainer>
          ))}
        </ResultList>
        <NextPageBtn clickHandler={gotoNextPage} hasNextPage={paginationRef.current?.hasNextPage} />
      </ResultListContainer>
    </Container>
  );
};

export default Result;
