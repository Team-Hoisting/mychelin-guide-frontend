import React from 'react';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';
import userState from '../../recoil/atoms/userState';
import { fetchPrevStore, fetchVotesByNickname, reVote } from '../../api/votes';
import { categoryInfo } from '../../constants';
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

const DuplicateCategory = ({ selectedCode, store, setStep, setPrevStoreId }) => {
  const { nickname } = useRecoilValue(userState);

  // 이전에 투표한 매장 가져오기
  const { data: prevStore, isLoading } = useQuery({
    queryKey: ['votes', nickname, selectedCode],
    queryFn: fetchPrevStore(nickname, selectedCode),
    staleTime: 1000,
  });

  const onNext = async () => {
    // 재투표하기
    await reVote({
      nickname,
      storeId: store.storeId,
      categoryCode: selectedCode,
      votedAt: new Date(),
    })();
    console.log(prevStore.storeName);
    setPrevStoreId(prevStore.storeId);

    // 중복 매장 확인
    const votes = await fetchVotesByNickname(nickname)();
    const count = votes.filter(vote => vote.storeId === store.storeId).length;

    if (count !== 1) setStep(3);
    else setStep(4);
  };

  if (isLoading) return <></>;

  return (
    <Container>
      <Text>
        현재 <span className="bold">{categoryInfo[selectedCode]?.ko} 카테고리</span>에서
      </Text>
      <ChangeLog>
        <Box>
          <span className="bold">{prevStore.storeName}</span>
        </Box>
        <ArrowIcon />
        <Box>
          <span className="blue bold">{store.storeName}</span>
        </Box>
      </ChangeLog>
      <Text center>
        <span className="bold">변경</span>하시겠습니까?
      </Text>
      <ButtonGroup leftText="확인" rightText="취소" onNext={onNext} onClose={() => setStep(1)} mt="2rem" />
    </Container>
  );
};

export default DuplicateCategory;
