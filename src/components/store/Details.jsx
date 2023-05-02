import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { storeQueryKey } from '../../constants/index';
import { fetchStore } from '../../api/stores';
import { Title, DetailSide, Votes } from './index';
import { Loader } from '../common/index';

const StoreDetailContainer = styled.div`
  width: 100%;
  min-width: 1000px;
  margin-bottom: 50px;
`;

const FirstVoteUser = styled.div`
  font-size: 18px;
  margin: 4px 0;
`;

const UserName = styled.span`
  font-weight: 700;
`;

const storeQuery = storeid => ({
  queryKey: [...storeQueryKey, storeid],
  queryFn: fetchStore(storeid),
});

const Details = ({ archivedCntState, setArchiveCntState, addBookMark, deleteBookMark }) => {
  const { id } = useParams();
  const { data: storeData, isLoading } = useQuery(storeQuery(id));

  React.useEffect(() => {
    if (isLoading) return;
    setArchiveCntState(storeData?.archivesCount);
  }, [isLoading]);

  if (isLoading) return <Loader />;

  return (
    <StoreDetailContainer className="storedetail">
      <Title
        storeId={storeData.storeId}
        storeName={storeData.storeName}
        starCnt={storeData.starsCount}
        addBookMark={addBookMark}
        deleteBookMark={deleteBookMark}
        archivedCntState={archivedCntState}
      />
      <FirstVoteUser>
        최초 투표자 : <UserName>{storeData.firstVoteUser}</UserName>
      </FirstVoteUser>
      <DetailSide store={storeData} />
      <Votes voteCnt={storeData.votesCount} />
    </StoreDetailContainer>
  );
};

export default Details;
