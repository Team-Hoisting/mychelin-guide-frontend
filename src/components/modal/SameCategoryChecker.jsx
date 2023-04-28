import React from 'react';
import styled, { css } from 'styled-components';
import { useQueries } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';
import userState from '../../recoil/atoms/userState';
import { fetchStore } from '../../api/stores';
import { reVote } from '../../api/votes';
import categoryInfo from '../../constants/categoryInfo';
import ButtonGroup from './ButtonGroup';

const Container = styled.div`
  padding: 2rem 2rem;

  background-color: var(--bg-color);
  color: var(--font-color);
`;

const ChangeLog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;

  .red {
    color: #d21312;
  }

  .blue {
    color: var(--font-secondary);
  }
`;

const Box = styled.div`
  // background: var(--button-disabled-color);
  padding: 1.2rem;
  display: flex;
  justify-content: center;
  margin: 1rem 7rem;
  font-size: 1.8rem;
  font-weight: 600;
  width: 60%;

  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
  }
`;

const Text = styled.p`
  margin: 0;
  padding: 0;

  .bold {
    font-weight: 700;
  }

  .red {
    color: #d21312;
  }

  ${props =>
    props.center &&
    css`
      text-align: center;
    `}
`;

const ArrowIcon = styled(MdOutlineKeyboardDoubleArrowDown)`
  font-size: 1.5rem;
`;

const SameCategoryChecker = ({ storeId, categoryCode, setPhase, setTaskQueue }) => {
  const { nickname, voteStatus } = useRecoilValue(userState);
  const { storeId: votedPrevStoreId } = voteStatus.find(vote => vote.categoryCode === categoryCode);

  const results = useQueries({
    queries: [
      { queryKey: ['store', storeId], queryFn: fetchStore(storeId), staleTime: 1000 * 3 },
      { queryKey: ['store', votedPrevStoreId], queryFn: fetchStore(votedPrevStoreId), staleTime: 1000 * 3 },
    ],
  });

  const [store, votedPrevStore] = results;

  if (store.isLoading || votedPrevStore.isLoading) return <></>;

  const onNext = () => {
    setTaskQueue(taskQueue => [
      ...taskQueue,
      () => reVote({ storeId, nickname, categoryCode, votedAt: new Date().valueOf() }),
    ]);

    const sameStoreCount = voteStatus.filter(vote => vote.storeId === storeId).length;

    setPhase(sameStoreCount !== 0 ? 'store' : 'success');
  };

  return (
    <Container>
      <Text>
        현재 <span className="bold">{categoryInfo[categoryCode]?.ko} 카테고리</span>에서
      </Text>
      <ChangeLog>
        <Box>
          <span className="bold">{votedPrevStore.data.storeName}</span>
        </Box>
        <ArrowIcon />
        <Box>
          <span className="blue bold">{store.data.storeName}</span>
        </Box>
      </ChangeLog>
      <Text center>
        <span className="bold">변경</span>하시겠습니까?
      </Text>
      <ButtonGroup leftText="확인" rightText="취소" onNext={onNext} onClose={() => setPhase('select')} mt="2rem" />
    </Container>
  );
};

export default SameCategoryChecker;
