import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { storeQueryKey } from '../../constants/index';
import { fetchStore } from '../../api/stores';
import { Title, Votes, DetailSide } from './index';
import { Loader } from '../common/index';
// import { clampUseMovePosition } from '../../../node_modules/@mantine/hooks/lib/index';

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

const SubTitle = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const ArchivedCntMsg = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
`;

const Flex = styled.div`
  display: flex;
`;

const VoteCntMsg = styled.span`
  margin: 0 12px;
  font-size: 16px;
  font-weight: 500;
`;

const storeQuery = storeid => ({ queryKey: [...storeQueryKey, storeid], queryFn: fetchStore(storeid) });

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
      <Title storeData={storeData} addBookMark={addBookMark} deleteBookMark={deleteBookMark} />
      <SubTitle>
        <FirstVoteUser>
          최초 투표자 : <UserName>{storeData.firstVoteUser}</UserName>
        </FirstVoteUser>
        <Flex>
          <VoteCntMsg>투표 {storeData.totalVotesCnt}개</VoteCntMsg>
          <ArchivedCntMsg>저장 {archivedCntState}개</ArchivedCntMsg>
        </Flex>
      </SubTitle>
      <DetailSide store={storeData} />
      <Votes voteCnt={storeData.voteCnt} />
    </StoreDetailContainer>
  );
};

export default Details;
