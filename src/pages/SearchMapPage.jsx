import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import { useKeywordSearch, useMarkeredMap } from '../hooks';
import { ResultList, MoveResultPageBtn } from '../components/searchmap';
import { SearchBar, Loader } from '../components/common';

const Container = styled.div`
  display: flex;
`;

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 4rem);
  z-index: 1;
`;

const SideSearch = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 500px;
  height: calc(100vh - 4rem);
  overflow-y: scroll;
  background-color: var(--bg-color);
  justify-content: space-between;
  z-index: 2;
`;

const SearchBarContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Result = styled.div`
  height: 90%;
`;

const PrevIcon = styled(RiArrowUpSLine)`
  color: var(--border-tertiary);
  margin-bottom: 1rem;
`;

const NextIcon = styled(RiArrowDownSLine)`
  color: var(--border-tertiary);
  margin-top: 1rem;
`;

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
            width="330px"
            submitHandler={() => {
              keywordSearch(inputRef.current.value);
            }}
          />
        </SearchBarContainer>
        <Result>
          {result && (
            <React.Suspense fallback={<Loader />}>
              <MoveResultPageBtn clickHandler={gotoPreviousPage} hasPage={paginationRef.current?.hasPrevPage}>
                <PrevIcon />
              </MoveResultPageBtn>
              <ResultList
                keyword={inputRef.current.value}
                result={result}
                curPage={paginationRef.current?.current}
                drawMarkers={drawMarkers}
                clickedIdx={clickedIdx}
              />
              <MoveResultPageBtn clickHandler={gotoNextPage} hasPage={paginationRef.current?.hasNextPage}>
                <NextIcon />
              </MoveResultPageBtn>{' '}
            </React.Suspense>
          )}
        </Result>
      </SideSearch>
    </Container>
  );
};

export default SearchMapPage;
