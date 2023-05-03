import React from 'react';
import styled from 'styled-components';

import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import { useQuery } from '@tanstack/react-query';
import { ResultItem, ResultItemOnHover } from '.';

import { fetchIsRegisteredByStoreIds } from '../../api/stores';
import { Loader, SearchBar } from '../common';

const Container = styled.div`
  padding: 10px;
  height: calc(100vh - 5rem);
  overflow-y: scroll;
  width: 500px;
  background-color: var(--bg-color);
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SearchBarContainer = styled.div`
  padding: 20px 0;
`;

const ListContainer = styled.div`
  height: 90%;
  margin-top: 20px;
`;

const List = styled.ul`
  margin: auto;
  padding: 5px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ResultItemContainer = styled.li`
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: 0.2s ease-in-out;

  ${props =>
    props.selected &&
    `
      border-bottom: 1px solid var(--primary-color);
      scale: 1.01;
    `}

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

const PrevIcon = styled(RiArrowUpSLine)`
  color: var(--border-tertiary);
  margin-bottom: 20px;
`;

const NextIcon = styled(RiArrowDownSLine)`
  color: var(--border-tertiary);
  margin-top: 20px;
`;

const PreviousPageBtn = ({ hasPrevPage, clickHandler }) => (
  <ButtonContainer onClick={clickHandler} hasPage={hasPrevPage}>
    <PrevIcon />
  </ButtonContainer>
);

const NextPageBtn = ({ hasNextPage, clickHandler }) => (
  <ButtonContainer onClick={clickHandler} hasPage={hasNextPage}>
    <NextIcon />
  </ButtonContainer>
);

const ResultList = ({ keyword, keywordSearch, result, paginationRef, drawMarkers, clickedIdx }) => {
  const inputRef = React.useRef(null);

  const gotoPreviousPage = () => {
    if (paginationRef.current.hasPrevPage) paginationRef.current.prevPage();
  };

  const gotoNextPage = () => {
    if (paginationRef.current.hasNextPage) paginationRef.current.nextPage();
  };

  const { data: resultList, isLoading } = useQuery({
    queryKey: ['isRegistered', keyword, paginationRef.current?.current],
    queryFn: result ? fetchIsRegisteredByStoreIds(result.map(({ id }) => id)) : () => {},
    select(data) {
      return result.map((store, idx) => ({ store, isRegistered: data[idx] }));
    },
  });

  if (isLoading) return <Loader />;

  drawMarkers(resultList);

  return (
    <Container>
      <SearchBarContainer>
        <SearchBar
          hasDropdown={false}
          placeholder="당신만의 맛집을 알려주세요!"
          defaultValue={keyword}
          inputRef={inputRef}
          width="375px"
          submitHandler={() => {
            keywordSearch(inputRef.current.value);
          }}
        />
      </SearchBarContainer>
      <ListContainer>
        <PreviousPageBtn clickHandler={gotoPreviousPage} hasPrevPage={paginationRef.current?.hasPrevPage} />
        <List>
          {resultList?.length !== 0 ? (
            resultList?.map(({ store, isRegistered }, idx) => (
              <ResultItemContainer key={store.id} selected={clickedIdx === idx}>
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
      </ListContainer>
    </Container>
  );
};

export default ResultList;
