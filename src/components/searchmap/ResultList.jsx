import React from 'react';
import styled from 'styled-components';

import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import { useQuery } from '@tanstack/react-query';
import { ResultItem, ResultItemOnHover } from '.';

import { fetchIsRegisteredByStoreIds } from '../../api/stores';
import { Loader } from '../common/index';

const Container = styled.div`
  position: absolute;
  padding: 10px;
  height: calc(100vh - 5rem - 4rem);
  overflow-y: scroll;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  z-index: 1;
`;

const List = styled.ul`
  margin: auto;
  padding: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ResultItemContainer = styled.li`
  position: relative;
  width: 100%;
  height: 100px;
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
  cursor: pointer;

  ${({ hasPage }) => !hasPage && 'visibility: hidden;'}

  :hover {
    color: #c5c5c5;
  }
`;

const ZeroResultText = styled.span`
  color: white;
  font-size: 20px;
`;

const PreviousPageBtn = ({ hasPrevPage, clickHandler }) => (
  <ButtonContainer onClick={clickHandler} hasPage={hasPrevPage}>
    <RiArrowUpSLine />
  </ButtonContainer>
);

const NextPageBtn = ({ hasNextPage, clickHandler }) => (
  <ButtonContainer onClick={clickHandler} hasPage={hasNextPage}>
    <RiArrowDownSLine />
  </ButtonContainer>
);

const ResultList = ({ result, paginationRef, drawMarkers }) => {
  const gotoPreviousPage = () => {
    if (paginationRef.current.hasPrevPage) paginationRef.current.prevPage();
  };

  const gotoNextPage = () => {
    if (paginationRef.current.hasNextPage) paginationRef.current.nextPage();
  };

  const { data: resultList, isLoading } = useQuery({
    queryKey: ['isRegistered', paginationRef.current.current],
    queryFn: fetchIsRegisteredByStoreIds(result.map(({ id }) => id)),
    select(data) {
      return result.map((store, idx) => ({ store, isRegistered: data[idx] }));
    },
  });

  if (isLoading) return <Loader />;

  drawMarkers(resultList);

  return (
    <Container>
      <PreviousPageBtn clickHandler={gotoPreviousPage} hasPrevPage={paginationRef.current?.hasPrevPage} />
      <List>
        {resultList?.length !== 0 ? (
          resultList?.map(({ store, isRegistered }, idx) => (
            <ResultItemContainer key={store.id}>
              <ResultItemOnHover
                storeId={store.id}
                storeName={store.place_name}
                isRegistered={isRegistered}
                address={store.road_address_name}
                phoneNumber={store.phone}
                x={store.x}
                y={store.y}
              />
              <ResultItem
                key={store.id}
                currentIdx={String.fromCharCode(idx + 65)}
                storeName={store.place_name}
                address={store.road_address_name}
                phoneNumber={store.phone}
              />
            </ResultItemContainer>
          ))
        ) : (
          <ZeroResultText>검색 결과가 없습니다.</ZeroResultText>
        )}
      </List>
      <NextPageBtn clickHandler={gotoNextPage} hasNextPage={paginationRef.current?.hasNextPage} />
    </Container>
  );
};

export default ResultList;
