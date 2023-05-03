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

const Result = ({ keyword, result, paginationRef }) => {
  const [clickedIdx, setClickedIdx] = React.useState(null);
  const { mapContainerRef, drawMarkers } = useMarkeredMap(idx => setClickedIdx(idx));

  React.useEffect(() => {
    setClickedIdx(null);
  }, [result]);

  return (
    <Container>
      <MapContainer ref={mapContainerRef} />
      {!!result && (
        <ResultList
          keyword={keyword}
          result={result}
          paginationRef={paginationRef}
          drawMarkers={drawMarkers}
          clickedIdx={clickedIdx}
        />
      )}
    </Container>
  );
};

export default Result;
