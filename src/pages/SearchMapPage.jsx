import { useState, useRef, useEffect } from 'react';

import { InputSearch, Result } from '../components/searchmap';

const { kakao } = window;

const SearchMapPage = ({ keyword = '오므토토마토' }) => {
  const inputRef = useRef(null);
  const [resultList, setResultList] = useState([]);
  const paginationRef = useRef(null);

  const ps = new kakao.maps.services.Places();

  const searchStore = (keyword = inputRef.current.value) => {
    ps.keywordSearch(
      keyword,
      (result, status, pagination) => {
        if (status !== kakao.maps.services.Status.OK) return;

        console.log('[RESULT]', result);
        console.log('[PAGE]', pagination);

        paginationRef.current = pagination;
        setResultList([...result]);
      },
      {
        category_group_code: ['FD6', 'CE7'],
        size: 3,
        page: 1,
      }
    );
  };

  useEffect(() => {
    searchStore(keyword);
  }, []);

  return (
    <>
      <InputSearch
        placeholder="당신의 맛집을 알려주세요!"
        defaultValue={keyword}
        inputRef={inputRef}
        submitHandler={searchStore}
      />
      <Result resultList={resultList} paginationRef={paginationRef} />
    </>
  );
};

export default SearchMapPage;
