import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import userState from '../../recoil/atoms/userState';
import { fetchStore } from '../../api/stores';
import { removeVote } from '../../api/votes';
import categoryInfo from '../../constants/categoryInfo';
import ButtonGroup from './ButtonGroup';

const Container = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: var(--bg-color);
  color: var(--font-color);
`;

const Title = styled.h3`
  color: red;
  font-size: 1.5rem;
  font-weight: 700;
`;

const MessageBox = styled.div``;

const Message = styled.p`
  margin: 0;
  padding: 0;
  margin-top: 2rem;
  font-size: 1.1rem;

  .main-color {
    color: #d21312;
  }

  .red {
    color: red;
    font-size: 1.2rem;
  }

  .em {
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

const SameStoreChecker = ({ storeId, setIsOpened, setTaskQueue, setPhase }) => {
  const { nickname, voteStatus } = useRecoilValue(userState);
  const { categoryCode: prevCategoryCode } = voteStatus.find(vote => vote.storeId === storeId);

  const { data: store, isLoading } = useQuery({
    queryKey: ['store', storeId],
    queryFn: fetchStore(storeId),
    staleTime: 1000 * 3,
  });

  if (isLoading) return <></>;

  const onNext = () => {
    setTaskQueue(taskQueue => [...taskQueue, () => removeVote(nickname, prevCategoryCode)]);

    setPhase('success');
  };

  return (
    <Container>
      <Title>매장 중복</Title>
      <MessageBox>
        <Message>
          <span className="main-color">마이슐랭 가이드</span>는 <span className="em">하나의 매장</span>에{' '}
          <span className="em">하나의 투표</span>만 부여할 수 있습니다.
        </Message>
        <Message>
          <span className="em">&quot;{store.storeName}&quot;</span>은{' '}
          <span className="em">&quot;{categoryInfo[prevCategoryCode]?.ko}&quot;</span> 카테고리로 투표되어 있습니다.
        </Message>
        <Message>
          <span className="red">기존 투표를 삭제하시겠습니까?</span>
        </Message>
      </MessageBox>
      <ButtonGroup
        leftText="확인"
        rightText="취소"
        onNext={onNext}
        onClose={() => {
          setTaskQueue([]);
          setIsOpened(false);
        }}
        mt="2rem"
      />
    </Container>
  );
};

export default SameStoreChecker;
