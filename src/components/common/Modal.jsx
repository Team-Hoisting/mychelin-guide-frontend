import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { Modal, Group, Button } from '@mantine/core';
import { fetchStore } from '../../api/stores';
import { fetchPrevStore, vote, fetchVotesByNickname, reVote, removeVote } from '../../api/votes';
import userState from '../../recoil/atoms/userState';
import Vote from '../modal/Vote';
import DuplicateCategory from '../modal/DuplicateCategory';
import DuplicateStore from '../modal/DuplicateStore';
import Success from '../modal/Success';

/*
  카테고리 선택, 카테고리 중복, 가게 중복, 성공

  카테고리 중복: 사용자가 기존의 해당 코드로 투표를 한 적이 있음

  가게 중복: 사용자가 다른 카테고리 표로 해당 가게를 투표한 적이 있음

  1. VotingCategorySelector
    - data: store(투표할 매장), prevStore(동일 카테고리의 이전 매장), votes(사용자 투표 현황)

    - 동일 카테고리의 이전 매장 존재 -> SameCategorySolver(2)

    - 동일 카테고리의 이전 매장 없음 -> vote(storeId, email, categoryCode, votedAt)
      - 투표 현황에 현재 투표를 진행한 매장 존재 -> DuplicateStoreSolver(3)
      - 투표 현황에 현재 투표를 진행한 매장 없음 -> VotingSuccessIndicator(4)
  
  2. SameCategorySolver
    - data: store(투표할 매장), prevStore(동일 카테고리의 이전 매장)

    - 확인 버튼 클릭 -> reVote(storeId, nickname, categoryCode, votedAt)
      - 투표 현황에 재투표를 진행한 매장 존재 -> DuplicateStoreSolver(3)
      - 투표 현황에 재투표를 진행한 매장 없음 -> VotingSuccessIndicator(4)
    
    - 취소 버튼 클릭 -> VotingCategorySelector(1)
  
  3. DuplicateStoreSolver
    - data: store(투표할 매장), votesOfVoteStores(중복된 매장에 투표한 목록)

    - 확인 버튼 클릭 -> removeVote(nickname, votesOfVoteStores[0].categoryCode) -> VotingSuccessIndicator(4)

    - 취소 버튼 클릭 -> vote, reVote 취소 -> 닫기
  
  4. VotingSuccessIndicator
    - vote, reVote, removeVote 수행

    - 닫기 버튼 or 오버레이 클릭 -> 모달 닫기

    - 마이 페이지 이동 버튼 클릭 -> 모달 닫기 후 마이 페이지 이동
*/

const PopupModal = ({ storeId, width }) => {
  const [selectedCode, setSelectedCode] = React.useState(null);
  const [isOpened, setIsOpened] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [prevStoreId, setPrevStoreId] = React.useState(null);
  const { email, nickname } = useRecoilValue(userState);

  React.useEffect(() => {
    if (!isOpened) return;

    setSelectedCode(null);
    setPrevStoreId(null);
    setStep(1);
  }, [isOpened]);

  const onClose = async () => {
    if (step === 3) {
      if (prevStoreId) await reVote({ storeId: prevStoreId, nickname, categoryCode: selectedCode })();
      else await removeVote(nickname, selectedCode)();
    }
    setIsOpened(false);
  };

  const onSelect = async () => {
    const prevStore = await fetchPrevStore(nickname, selectedCode)();
    const votes = await fetchVotesByNickname(nickname)();
    const count = votes.filter(vote => vote.storeId === storeId).length;

    if (prevStore) {
      setStep(2);
    } else {
      await vote({
        storeId,
        email,
        categoryCode: selectedCode,
        votedAt: new Date(),
      })();

      if (count === 0) setStep(4);
      else setStep(3);
    }
  };

  // 현재 투표할 매장 가져오기
  const { data: store, isLoading } = useQuery({
    queryKey: ['store', storeId],
    queryFn: fetchStore(storeId),
    staleTime: 1000,
  });

  if (isLoading) return <></>;

  return (
    <>
      <Modal
        opened={isOpened}
        onClose={onClose}
        transitionProps={{ transition: 'slide-up', duration: 300, timingFunction: 'linear' }}
        zIndex="9999"
        size="lg"
        centered>
        {step === 1 ? (
          <Vote
            selectedCode={selectedCode}
            setSelectedCode={setSelectedCode}
            store={store}
            onClose={onClose}
            onNext={onSelect}
          />
        ) : step === 2 ? (
          <DuplicateCategory
            selectedCode={selectedCode}
            store={store}
            setStep={setStep}
            setPrevStoreId={setPrevStoreId}
          />
        ) : step === 3 ? (
          <DuplicateStore store={store} setStep={setStep} onClose={onClose} />
        ) : (
          <Success />
        )}
      </Modal>
      <Group position="center">
        <Button
          onClick={() => setIsOpened(true)}
          styles={theme => ({
            root: {
              width: width || '200px',
              height: '44px',
              margin: '6px',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              backgroundColor: '#d21312',
              color: '#fff',
              '&:not([data-disabled])': theme.fn.hover({
                backgroundColor: theme.fn.darken('#d21312', 0.05),
              }),
            },
          })}>
          투표하기
        </Button>
      </Group>
    </>
  );
};

const ModalContainer = ({ storeId, width }) => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  if (!user)
    return (
      <Group position="center">
        <Button
          onClick={() => {
            navigate('/signin');
          }}
          styles={theme => ({
            root: {
              width: width || '200px',
              height: '44px',
              margin: '6px',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              backgroundColor: '#d21312',
              color: '#fff',
              '&:not([data-disabled])': theme.fn.hover({
                backgroundColor: theme.fn.darken('#d21312', 0.05),
              }),
            },
          })}>
          투표하기
        </Button>
      </Group>
    );

  return <PopupModal storeId={storeId} width={width} />;
};

export default ModalContainer;
