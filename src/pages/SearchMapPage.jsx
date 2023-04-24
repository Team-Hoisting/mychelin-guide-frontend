import React from 'react';

import { InputSearch, Result } from '../components/searchmap';

import useKeywordSearch from '../hooks/useKeywordSearch';

const SearchMapPage = ({ keyword = '오므토토마토' }) => {
  const inputRef = React.useRef(null);
  const { keywordSearch, result, paginationRef } = useKeywordSearch();

  React.useEffect(() => {
    keywordSearch(keyword);
  }, []);

  return (
    <>
      <InputSearch
        placeholder="당신의 맛집을 알려주세요!"
        defaultValue={keyword}
        inputRef={inputRef}
        submitHandler={() => {
          keywordSearch(inputRef.current.value);
        }}
      />
      <Result result={result} paginationRef={paginationRef} />
    </>
  );
};

export default SearchMapPage;
