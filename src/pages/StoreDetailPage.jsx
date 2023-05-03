import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useArchivesMutation } from '../hooks/index';
import { Comments, Details } from '../components/store/index';
import { SkinnyContainer, Loader } from '../components/common';

const Container = styled.div`
  width: 100%;
  padding: 12px 0;
  font-size: 20px;
`;

const Center = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const StoreDetailPage = () => {
  const [archivedCntState, setArchiveCntState] = React.useState(0);
  const { id } = useParams();

  const { addBookMark, deleteBookMark } = useArchivesMutation({
    id,
    setArchiveCntState,
  });

  return (
    <SkinnyContainer>
      <Container className="container">
        <Center className="center">
          <Details
            addBookMark={addBookMark}
            deleteBookMark={deleteBookMark}
            archivedCntState={archivedCntState}
            setArchiveCntState={setArchiveCntState}
          />
          <React.Suspense fallback={<Loader />}>
            <Comments />
          </React.Suspense>
        </Center>
      </Container>
    </SkinnyContainer>
  );
};

export default StoreDetailPage;
