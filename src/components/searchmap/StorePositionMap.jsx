import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`;
const { kakao } = window;

const StorePositionMap = ({ x, y }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const storePosition = new kakao.maps.LatLng(y, x);

    const marker = new kakao.maps.Marker({
      position: storePosition,
    });

    mapRef.current = new kakao.maps.StaticMap(mapContainerRef.current, {
      center: storePosition,
      level: 3,
      marker,
    });
  }, []);

  return <Container ref={mapContainerRef} />;
};

export default StorePositionMap;
