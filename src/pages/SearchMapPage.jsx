import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { Result } from '../components/searchmap';
import useKeywordSearch from '../hooks/useKeywordSearch';

const Container = styled.main`
  position: relative;
`;

const SearchMapPage = () => {
  const [params] = useSearchParams();
  const keyword = params.get('keyword');

  const inputRef = React.useRef(null);
  const { keywordSearch, result, paginationRef } = useKeywordSearch();

  React.useEffect(() => {
    if (keyword) keywordSearch(keyword);
  }, []);

  return (
    <Container>
      <Result
        keyword={inputRef.current?.value}
        keywordSearch={keywordSearch}
        result={result}
        paginationRef={paginationRef}
      />
    </Container>
  );
};

export default SearchMapPage;
