import React from 'react';

const { kakao } = window;

const useKeywordSearch = (size = 6, page = 1) => {
  const [result, setResult] = React.useState([]);
  const paginationRef = React.useRef(null);

  const ps = new kakao.maps.services.Places();

  const keywordSearch = keyword => {
    ps.keywordSearch(
      keyword,
      (result, status, pagination) => {
        if (status !== kakao.maps.services.Status.OK) return;

        paginationRef.current = pagination;
        setResult([...result]);
      },
      {
        category_group_code: ['FD6', 'CE7'],
        size,
        page,
      }
    );
  };

  return { keywordSearch, result, paginationRef };
};

export default useKeywordSearch;
