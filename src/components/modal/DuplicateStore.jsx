import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import userState from '../../recoil/atoms/userState';
import { fetchVotesByNickname, removeVote } from '../../api/votes';
import { categoryInfo } from '../../constants';
import ButtonGroup from './ButtonGroup';

const Container = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  color: red;
`;

const Text = styled.p`
  margin: 1rem 0;
  padding: 0;
`;

const DuplicateStore = ({ store, setStep, onClose }) => {
  const { nickname } = useRecoilValue(userState);

  // 사용자 투표 목록 가져오기
  const { data: votes, isLoading } = useQuery({
    queryKey: ['votes', nickname],
    queryFn: fetchVotesByNickname(nickname),
    staleTime: 1000,
    select: votes => votes.filter(vote => vote.storeId === store.storeId),
  });

  if (isLoading) return <></>;

  const onConfirm = async () => {
    await removeVote(nickname, votes[0].categoryCode)();
    setStep(4);
  };

  return (
    <Container>
      <Title>매장 중복</Title>
      <Text>하나의 매장에는 하나의 투표만 부여할 수 있습니다.</Text>
      <Text>
        {store.storeName}은 이미 {categoryInfo[votes[0]?.categoryCode]?.ko} 카테고리로 투표되어 있습니다.
      </Text>
      <Text>기존 투표를 삭제하시겠습니까?</Text>
      <ButtonGroup leftText="확인" rightText="취소" onNext={onConfirm} onClose={onClose} mt="2rem" />
    </Container>
  );
};

export default DuplicateStore;
