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
`;

const Text = styled.p`
  margin: 1rem 0;
  padding: 0;
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
      <Text>하나의 매장에는 하나의 투표만 부여할 수 있습니다.</Text>
      <Text>
        {store.storeName}은 이미 {categoryInfo[prevCategoryCode]?.ko} 카테고리로 투표되어 있습니다.
      </Text>
      <Text>기존 투표를 삭제하시겠습니까?</Text>
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
