import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { Modal, Group, Button } from '@mantine/core';
import { fetchStore } from '../../api/stores';
import { fetchPrevStore, vote, fetchVotesByNickname } from '../../api/votes';
import userState from '../../recoil/atoms/userState';
import Vote from '../modal/Vote';
import DuplicateCategory from '../modal/DuplicateCategory';
import DuplicateStore from '../modal/DuplicateStore';
import Success from '../modal/Success';

// const useStore = storeId => {
//   const [store, setStore] = React.useState({});
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [error, setError] = React.useState(null);

//   React.useEffect(() => {
//     (async () => {
//       try {
//         setIsLoading(true);

//         const store = await fetchStore(storeId)();

//         setStore(store);
//       } catch (e) {
//         setError(e);
//       } finally {
//         setIsLoading(false);
//       }
//     })();
//   }, [storeId]);

//   return { store, isLoading, error };
// };

const PopupModal = ({ storeId }) => {
  const [selectedCode, setSelectedCode] = React.useState(null);
  const [step, setStep] = React.useState(1);
  const [isOpened, setIsOpened] = React.useState(false);
  const [prevStoreId, setPrevStoreId] = React.useState(null);
  const { email, nickname } = useRecoilValue(userState);

  React.useEffect(() => {
    if (!isOpened) return;

    setSelectedCode(null);
    setPrevStoreId(null);
    setStep(1);
  }, [isOpened]);

  const onClose = () => {
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
          <DuplicateStore
            selectedCode={selectedCode}
            prevStoreId={prevStoreId}
            store={store}
            setStep={setStep}
            onClose={onClose}
          />
        ) : (
          <Success />
        )}
      </Modal>
      <Group position="center">
        <Button
          onClick={() => setIsOpened(true)}
          styles={theme => ({
            root: {
              width: '200px',
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

export default PopupModal;
