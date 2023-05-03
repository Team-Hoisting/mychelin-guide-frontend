import React from 'react';
import styled from 'styled-components';

import useMarkeredMap from '../../hooks/useMarkeredMap';

import ResultList from './ResultList';

const Container = styled.div`
  display: flex;
`;

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 5rem);
  z-index: 1;
`;

const Result = ({ keyword, result, paginationRef, keywordSearch }) => {
  const [clickedIdx, setClickedIdx] = React.useState(null);
  const { mapContainerRef, drawMarkers } = useMarkeredMap(idx => setClickedIdx(idx));

  React.useEffect(() => {
    setClickedIdx(null);
  }, [result]);

  return (
    <Container>
      <MapContainer ref={mapContainerRef} />
      <ResultList
        keywordSearch={keywordSearch}
        keyword={keyword}
        result={result}
        paginationRef={paginationRef}
        drawMarkers={drawMarkers}
        clickedIdx={clickedIdx}
      />
    </Container>
  );
};

export default Result;
