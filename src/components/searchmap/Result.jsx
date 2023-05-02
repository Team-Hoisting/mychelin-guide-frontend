import React from 'react';
import styled from 'styled-components';

import useMarkeredMap from '../../hooks/useMarkeredMap';

import ResultList from './ResultList';
import { Toast } from '../common/index';

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
  const { mapContainerRef, drawMarkers } = useMarkeredMap(() => setIsUnregisterdStore(true));
  const [isUnregisterdStore, setIsUnregisterdStore] = React.useState(false);

  return (
    <Container>
      <MapContainer ref={mapContainerRef} />
      {!!result && <ResultList result={result} paginationRef={paginationRef} drawMarkers={drawMarkers} />}
      {isUnregisterdStore && (
        <Toast type="warning" text="등록되지 않은 식당입니다." closeHandler={() => setIsUnregisterdStore(false)} />
      )}
    </Container>
  );
};

export default Result;
