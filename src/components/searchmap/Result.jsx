import React from 'react';
import styled from 'styled-components';

import { Carousel } from '@mantine/carousel';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import { ResultItem, ResultItemOnHover } from '.';

const Container = styled.div`
  position: relative;
  margin: 10px auto;
  width: fit-content;
`;

const MapContainer = styled.div`
  margin: auto;
  width: 900px;
  height: 400px;
  border-radius: 30px;
`;

const CarouselContainer = styled(Carousel)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
`;

const ResultList = styled.ul`
  margin: 0;
  padding: 0;
  height: 100%;
  right: 0px;
  top: 0px;
  border-radius: 20px;
  z-index: 990;
`;

const ResultItemContainer = styled.li`
  position: relative;
  margin: 13px;
  width: 250px;
  height: 100px;
  background-color: white;
  opacity: 0.9;
  border-radius: 20px;
  box-shadow: 3px 3px 3px #ababab;
  list-style: none;
  overflow: hidden;

  :hover {
    scale: 1.02;
  }

  :hover > main {
    transition: 0.1s ease-in-out;
    background-color: rgba(0, 0, 0, 0.8);

    div {
      display: flex;
    }

    img {
      display: block;
    }
  }
`;

const ButtonContainer = styled.div`
  width: 20px;
  height: 20px;
  background-color: var(--primary-color);
  border-radius: 50%;
  text-align: center;
  color: white;
`;

const PreviousPageBtn = ({ hasPrevPage, onClick }) => (
  <>
    {hasPrevPage && (
      <ButtonContainer onClick={onClick}>
        <RiArrowUpSLine />
      </ButtonContainer>
    )}
  </>
);

const NextPageBtn = ({ hasNextPage, onClick }) => (
  <>
    {hasNextPage && (
      <ButtonContainer onClick={onClick}>
        <RiArrowDownSLine />
      </ButtonContainer>
    )}
  </>
);

const { kakao } = window;

const Result = ({ resultList, paginationRef }) => {
  const mapRef = React.useRef(null);
  const mapContainerRef = React.useRef(null);
  const markersRef = React.useRef([]);

  const gotoPreviousPage = () => {
    if (paginationRef.current.hasPrevPage) paginationRef.current.prevPage();
  };

  const gotoNextPage = () => {
    if (paginationRef.current.hasNextPage) paginationRef.current.nextPage();
  };

  React.useEffect(() => {
    mapRef.current = new kakao.maps.Map(mapContainerRef.current, {
      center: new kakao.maps.LatLng(37.497934, 127.027616), // 설정한 위도와 경도를 지도의 중심으로 설정
      level: 3, // 지도의 확대 레벨
    });
  }, []);

  React.useEffect(() => {
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
      <MapContainer ref={mapContainerRef} />
      <CarouselContainer
        slideSize="100%"
        height={400}
        orientation="vertical"
        slideGap="xl"
        controlsOffset="xs"
        controlSize={25}
        draggable={false}
        nextControlIcon={<NextPageBtn onClick={gotoNextPage} hasNextPage={paginationRef.current?.hasNextPage} />}
        previousControlIcon={
          <PreviousPageBtn onClick={gotoPreviousPage} hasPrevPage={paginationRef.current?.hasPrevPage} />
        }
        styles={{
          control: {
            'background-color': 'rgba(0,0,0,0);',
            'border-style': 'none',
            opacity: 'none',
            'box-shadow': 'none',
          },
        }}>
        <Carousel.Slide>
          <ResultList>
            {resultList.map(({ id, place_name: storeName, road_address_name: address, phone }) => (
              <ResultItemContainer key={id}>
                <ResultItemOnHover storeId={id} />
                <ResultItem key={id} storeName={storeName} address={address} phoneNumber={phone} />
              </ResultItemContainer>
            ))}
          </ResultList>
        </Carousel.Slide>
      </CarouselContainer>
    </Container>
  );
};

export default Result;
