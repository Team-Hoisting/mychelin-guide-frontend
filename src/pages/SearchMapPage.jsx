import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import useKeywordSearch from '../hooks/useKeywordSearch';
import useMarkeredMap from '../hooks/useMarkeredMap';
import ResultList from '../components/searchmap/ResultList';
import SearchBar from '../components/common/SearchBar';

const Container = styled.div`
  display: flex;
`;

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 5rem);
  z-index: 1;
`;

const SideSearch = styled.div`
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

const Result = styled.div`
  height: 90%;
  margin-top: 20px;
`;

const PrevIcon = styled(RiArrowUpSLine)`
  color: var(--border-tertiary);
  margin-bottom: 20px;
`;

const NextIcon = styled(RiArrowDownSLine)`
  color: var(--border-tertiary);
  margin-top: 20px;
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

const SearchMapPage = () => {
  const [params] = useSearchParams();
  const keyword = params.get('keyword');

  const { keywordSearch, result, paginationRef } = useKeywordSearch();
  const { mapContainerRef, drawMarkers } = useMarkeredMap(idx => setClickedIdx(idx));
  const [clickedIdx, setClickedIdx] = React.useState(null);

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setClickedIdx(null);
  }, [result]);

  React.useEffect(() => {
    if (keyword) keywordSearch(keyword);
  }, []);

  const gotoPreviousPage = () => {
    if (paginationRef.current.hasPrevPage) paginationRef.current.prevPage();
  };

  const gotoNextPage = () => {
    if (paginationRef.current.hasNextPage) paginationRef.current.nextPage();
  };

  return (
    <Container>
      <MapContainer ref={mapContainerRef} />
      <SideSearch>
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
        <Result>
          {result && (
            <>
              <PreviousPageBtn clickHandler={gotoPreviousPage} hasPrevPage={paginationRef.current?.hasPrevPage} />
              <ResultList
                keyword={inputRef.current.value}
                result={result}
                curPage={paginationRef.current?.current}
                drawMarkers={drawMarkers}
                clickedIdx={clickedIdx}
              />
              <NextPageBtn clickHandler={gotoNextPage} hasNextPage={paginationRef.current?.hasNextPage} />{' '}
            </>
          )}
        </Result>
      </SideSearch>
    </Container>
  );
};

export default SearchMapPage;
