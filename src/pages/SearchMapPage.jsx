import React from 'react';
import styled from 'styled-components';

import { useSearchParams } from 'react-router-dom';

import { Result } from '../components/searchmap';
import { SearchBar } from '../components/common';

import useKeywordSearch from '../hooks/useKeywordSearch';

const Container = styled.main`
  position: relative;
`;

const SearchBarContainer = styled.div`
  position: absolute;
  top: 3rem;
  width: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
`;

const SearchMapPage = () => {
  const [params] = useSearchParams();
  const keyword = params.get('keyword');

  const inputRef = React.useRef(null);
  const { keywordSearch, result, paginationRef } = useKeywordSearch();

  React.useEffect(() => {
    keywordSearch(keyword);
  }, []);

  return (
    <Container>
      <SearchBarContainer>
        <SearchBar
          hasDropdown={false}
          placeholder="당신의 맛집을 알려주세요!"
          defaultValue={keyword}
          inputRef={inputRef}
          width="600px"
          submitHandler={() => {
            keywordSearch(inputRef.current.value);
          }}
        />
      </SearchBarContainer>
      <Result result={result} paginationRef={paginationRef} />
    </Container>
  );
};

export default SearchMapPage;
