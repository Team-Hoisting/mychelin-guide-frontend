import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { storeQueryKey } from '../../constants/index';
import { fetchStore } from '../../api/stores';
import { Title, Votes, DetailSide } from './index';

const StoreDetailContainer = styled.div`
  width: 100%;
  min-width: 1000px;
  margin-bottom: 50px;
`;

const FirstVoteUser = styled.div`
  font-size: 16px;
  margin: 2px 0;
  color: #7f7f7f;
`;

const UserName = styled.span`
  font-weight: 700;
`;

const SubTitle = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

const ArchivedCntMsg = styled.p`
  margin: 0 12px;
  font-size: 16px;
  font-weight: 500;
  padding: 0;

  span {
    font-weight: 600;
  }
`;

const VoteCntMsg = styled.span`
  margin: 0 12px;
  padding: 0;
  font-size: 16px;
  font-weight: 500;

  span {
    font-weight: 600;
  }
`;

const storeQuery = storeid => ({ queryKey: [...storeQueryKey, storeid], queryFn: fetchStore(storeid) });

const Details = ({ archivedCntState, setArchiveCntState, addBookMark, deleteBookMark }) => {
  const { id } = useParams();
  const { data: storeData } = useQuery(storeQuery(id));

  React.useEffect(() => {
    setArchiveCntState(storeData?.archivesCount);
  }, []);

  return (
    <StoreDetailContainer className="storedetail">
      <Title storeData={storeData} addBookMark={addBookMark} deleteBookMark={deleteBookMark} />
      <SubTitle>
        <FirstVoteUser>
          최초 투표자 : <UserName>{storeData.firstVoteUser}</UserName>
        </FirstVoteUser>

        <VoteCntMsg>
          투표 <span>{storeData.totalVotesCnt}</span>개
        </VoteCntMsg>
        <ArchivedCntMsg>
          저장 <span>{archivedCntState}</span>개
        </ArchivedCntMsg>
      </SubTitle>
      <DetailSide store={storeData} />
      <Votes voteCnt={storeData.voteCnt} />
    </StoreDetailContainer>
  );
};

export default Details;
