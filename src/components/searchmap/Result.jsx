import React from 'react';
import styled from 'styled-components';

import useMarkeredMap from '../../hooks/useMarkeredMap';

import ResultList from './ResultList';

const Container = styled.div`
  position: relative;
`;

const MapContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 5rem - 4rem);
  z-index: 1;
  position: relative;
`;

const Result = ({ result, paginationRef }) => {
  const { mapContainerRef, drawMarkers } = useMarkeredMap(result);

  return (
    <Container>
      <MapContainer ref={mapContainerRef} />
      {result.length !== 0 && <ResultList result={result} paginationRef={paginationRef} drawMarkers={drawMarkers} />}
    </Container>
  );
};

export default Result;
