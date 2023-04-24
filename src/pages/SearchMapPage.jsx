import React from 'react';
import styled from 'styled-components';

import { useSearchParams } from 'react-router-dom';

import { Result } from '../components/searchmap';
import { SearchBar } from '../components/common';

import useKeywordSearch from '../hooks/useKeywordSearch';

const SearchBarContainer = styled.div`
  margin: 30px auto;
  width: fit-content;
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
    <>
      <SearchBarContainer>
        <SearchBar
          placeholder="당신의 맛집을 알려주세요!"
          defaultValue={keyword}
          refName={inputRef}
          submitHandler={() => {
            keywordSearch(inputRef.current.value);
          }}
        />
      </SearchBarContainer>

      <Result result={result} paginationRef={paginationRef} />
    </>
  );
};

export default SearchMapPage;
