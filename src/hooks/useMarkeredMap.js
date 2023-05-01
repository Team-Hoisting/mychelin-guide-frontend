import React from 'react';

const { kakao } = window;

const useMarkeredMap = (result = []) => {
  const mapRef = React.useRef(null);
  const mapContainerRef = React.useRef(null);
  const markersRef = React.useRef([]);

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
    if (result.length === 0) return;

    const bounds = new kakao.maps.LatLngBounds();

    markersRef.current = [];

    result.forEach(data => {
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

    mapRef.current.setBounds(bounds, 32, 225, 32, 32);
  });

  return mapContainerRef;
};

export default useMarkeredMap;
