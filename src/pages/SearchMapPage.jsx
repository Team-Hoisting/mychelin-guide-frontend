import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';

import { ResultList, MoveResultPageBtn } from '../components/searchmap';
import { SearchBar, Loader } from '../components/common';
import useMapSearch from '../hooks/useMapSearch';

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

  const {
    mapContainerRef,
    result,
    clickedIdx,
    curPage,
    hasPrevPage,
    hasNextPage,
    inputRef,
    search,
    gotoPreviousPage,
    gotoNextPage,
    drawMarkers,
  } = useMapSearch(keyword);

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
            submitHandler={search}
          />
        </SearchBarContainer>
        <Result>
          {result && (
            <React.Suspense fallback={<Loader />}>
              <MoveResultPageBtn clickHandler={gotoPreviousPage} hasPage={hasPrevPage}>
                <PrevIcon />
              </MoveResultPageBtn>
              <ResultList
                keyword={inputRef.current.value}
                result={result}
                curPage={curPage}
                drawMarkers={drawMarkers}
                clickedIdx={clickedIdx}
              />
              <MoveResultPageBtn clickHandler={gotoNextPage} hasPage={hasNextPage}>
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
