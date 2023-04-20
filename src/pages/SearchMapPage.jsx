import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { AiOutlineArrowRight } from 'react-icons/ai';

const SearchContainer = styled.div`
  display: flex;
  margin: 30px auto;
  width: 500px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #ababab;
`;

const SearchBar = styled.input`
  margin: 0 20px;
  width: 100%;
  border: none;

  :focus {
    outline: none;
  }
`;

const SearchIconContainer = styled.div`
  position: relative;
  margin-right: 5px;
  background-color: #d21312;
  cursor: pointer;
  top: 5px;
  padding: 7px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
`;

const SearchIcon = styled(AiOutlineArrowRight)`
  color: #fff;
`;

const InputSearch = ({
  placeholder = '맛집을 검색해보세요!',
  defaultValue = '',
  inputRef = null,
  submitHandler = () => {},
}) => (
  <SearchContainer>
    <SearchBar placeholder={placeholder} defaultValue={defaultValue} ref={inputRef} />
    <SearchIconContainer>
      <SearchIcon onClick={submitHandler} />
    </SearchIconContainer>
  </SearchContainer>
);

const ResultItem = ({ storeName, address, phoneNumber }) => {
  console.log('');
  return (
    <div>
      <h6>{storeName}</h6>
      <span>{address}</span>
      <span>{phoneNumber}</span>
    </div>
  );
};

const MapContainer = styled.div`
  margin: auto;
  width: 800px;
  height: 500px;
`;

const SearchResult = styled.div``;
// display: flex;

const ResultList = styled.ul`
  padding: 0px;
`;

const { kakao } = window;

const SearchMapPage = () => {
  const inputRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [resultList, setResultList] = useState([]);
  const markersRef = useRef([]);

  useEffect(() => {
    mapRef.current = new kakao.maps.Map(mapContainerRef.current, {
      center: new kakao.maps.LatLng(37.497934, 127.027616), // 설정한 위도와 경도를 지도의 중심으로 설정
      level: 3, // 지도의 확대 레벨
    });
  }, []);

  const ps = new kakao.maps.services.Places();

  useEffect(() => {
    markersRef.current.forEach(({ marker, infowindow }) => {
      marker.setMap(null);
      infowindow.close();
    });

    if (resultList.length === 0) return;

    const bounds = new kakao.maps.LatLngBounds();

    markersRef.current = [];

    resultList.forEach(data => {
      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(data.y, data.x),
      });

      const infowindow = new kakao.maps.InfoWindow();

      infowindow.setContent(`<div style="padding:5px;font-size:12px;">${data.place_name}</div>`);

      infowindow.open(mapRef.current, marker);

      markersRef.current = [...markersRef.current, { marker, infowindow }];

      bounds.extend(new kakao.maps.LatLng(data.y, data.x));
    });

    mapRef.current.setBounds(bounds);
  });

  const searchStore = () => {
    ps.keywordSearch(
      inputRef.current.value,
      (result, status) => {
        if (status !== kakao.maps.services.Status.OK) return;

        setResultList([...result]);
      },
      {
        category_group_code: 'FD6',
        // location: 특정 지역 기준 검색 + radius ( 반경 필터링 )
        size: 3,
      }
    );
  };

  return (
    <>
      <InputSearch placeholder="당신의 맛집을 알려주세요!" inputRef={inputRef} submitHandler={searchStore} />
      <SearchResult>
        <MapContainer ref={mapContainerRef} />

        <ResultList>
          {resultList.map(({ id, place_name: storeName, road_address_name: address, phone }) => (
            <ResultItem key={id} storeName={storeName} address={address} phoneNumber={phone} />
          ))}
        </ResultList>
      </SearchResult>
    </>
  );
};

export default SearchMapPage;
