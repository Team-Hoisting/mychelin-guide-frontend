import { useState, useRef } from 'react';

import { InputSearch, Result } from '../components/searchmap';

const { kakao } = window;

const SearchMapPage = () => {
  const inputRef = useRef(null);
  const [resultList, setResultList] = useState([]);

  const ps = new kakao.maps.services.Places();

  const searchStore = () => {
    ps.keywordSearch(
      inputRef.current.value,
      (result, status) => {
        if (status !== kakao.maps.services.Status.OK) return;

        setResultList([...result]);
      },
      {
        category_group_code: 'FD6',
        size: 3,
      }
    );
  };

  return (
    <>
      <InputSearch placeholder="당신의 맛집을 알려주세요!" inputRef={inputRef} submitHandler={searchStore} />
      <Result resultList={resultList} />
    </>
  );
};

export default SearchMapPage;
