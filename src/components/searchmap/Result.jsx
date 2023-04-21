import { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { ResultItem } from '.';

const Container = styled.div`
  position: relative;
  margin: auto;
  padding: 10px;
  width: fit-content;
`;

const MapContainer = styled.div`
  margin: auto;
  width: 900px;
  height: 400px;
  border-radius: 30px;
`;

const ResultList = styled.ul`
  position: absolute;
  right: 30px;
  top: 10px;
  z-index: 990;
`;

const { kakao } = window;

const Result = ({ resultList }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    mapRef.current = new kakao.maps.Map(mapContainerRef.current, {
      center: new kakao.maps.LatLng(37.497934, 127.027616), // 설정한 위도와 경도를 지도의 중심으로 설정
      level: 3, // 지도의 확대 레벨
    });
  }, []);

  useEffect(() => {
    markersRef.current.forEach(({ marker, infowindow }) => {
      marker.setMap(null);
      infowindow.close();
    });

    // TODO: 검색 결과 없는 경우 처리
    if (resultList.length === 0) return;

    const bounds = new kakao.maps.LatLngBounds();

    markersRef.current = [];

    resultList.forEach(data => {
      const infowindow = new kakao.maps.InfoWindow();
      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(data.y, data.x),
      });

      infowindow.setContent(`<div style="padding:5px;font-size:12px;">${data.place_name}</div>`);
      infowindow.open(mapRef.current, marker);

      markersRef.current = [...markersRef.current, { marker, infowindow }];

      bounds.extend(new kakao.maps.LatLng(data.y, data.x));
    });

    mapRef.current.setBounds(bounds, 32, 270, 32, 32);
  });

  return (
    <Container>
      <MapContainer ref={mapContainerRef}></MapContainer>
      <ResultList>
        {resultList.map(({ id, place_name: storeName, road_address_name: address, phone }) => (
          <ResultItem key={id} storeName={storeName} address={address} phoneNumber={phone} />
        ))}
      </ResultList>
    </Container>
  );
};

export default Result;
