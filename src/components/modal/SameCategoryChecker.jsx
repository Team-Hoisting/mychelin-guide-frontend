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

  .up {
    font-size: 1.1rem;
  }
`;

const Changes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 1.5rem;

  span {
    font-size: 1.3rem;
  }

  .red {
    color: #d21312;
  }

  .blue {
    color: var(--font-secondary);
  }

  .bold {
    font-weight: 700;
  }
`;

const Box = styled.div`
  padding: 1.2rem;
  display: flex;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 600;
  width: 300px;
  background-color: #ababab;
  overflow: hidden;
  border-radius: 5px;

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
  font-size: 2rem;
  transform: rotate(-90deg);
  margin-left: 1rem;
  margin-right: 1rem;
`;

const SameCategoryChecker = ({ storeId, store: storeInfo, categoryCode, setPhase, setTaskQueue }) => {
  const { nickname, voteStatus } = useRecoilValue(userState);
  const { storeId: votedPrevStoreId } = voteStatus.find(vote => vote.categoryCode === categoryCode);

  const results = useQueries({
    queries: [
      { queryKey: ['storeInfo', storeId], queryFn: fetchStore(storeId) },
      { queryKey: ['storeInfo', votedPrevStoreId], queryFn: fetchStore(votedPrevStoreId) },
    ],
  });

  const [store, votedPrevStore] = results;

  if (store.isLoading || votedPrevStore.isLoading) return <></>;

  const onNext = () => {
    setTaskQueue(taskQueue => [
      ...taskQueue,
      () => reVote({ storeId, nickname, categoryCode, votedAt: new Date().valueOf(), storeInfo }),
    ]);

    const sameStoreCount = voteStatus.filter(vote => vote.storeId === storeId).length;

    setPhase(sameStoreCount !== 0 ? 'store' : 'success');
  };

  return (
    <Container>
      <Text className="up">
        현재 <span className="bold red">{categoryInfo[categoryCode]?.ko} 카테고리</span> 표를
      </Text>
      <Changes>
        <span className="bold">{votedPrevStore.data.storeName}</span>
        <ArrowIcon />
        <span className="blue bold">{store.data.storeName ?? storeInfo.storeName}</span>
      </Changes>
      <Text center>
        <span className="bold">변경</span>하시겠습니까?
      </Text>
      <ButtonGroup leftText="확인" rightText="취소" onNext={onNext} onClose={() => setPhase('select')} mt="2rem" />
    </Container>
  );
};

export default SameCategoryChecker;
