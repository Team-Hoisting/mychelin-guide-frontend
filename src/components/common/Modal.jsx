import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Modal, Group, Button } from '@mantine/core';
import { categoryInfo } from '../../constants';
import Vote from '../modal/Vote';
import Confirmed from '../modal/Confirmed';
import Success from '../modal/Success';
import { fetchStore } from '../../api/stores';

const PopupModal = ({ storeId }) => {
  const [selectedCode, setSelectedCode] = React.useState(() => null);
  const [step, setStep] = React.useState(() => 1);
  const [isOpened, setIsOpened] = React.useState(false);

  // 현재 투표할 매장 가져오기
  const {
    data: store,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['store', storeId],
    queryFn: fetchStore(storeId),
    staleTime: 1000,
  });

  if (isLoading) return <></>;
  if (error) return <pre>{error}</pre>;

  const onClose = () => {
    setIsOpened(false);
  };

  return (
    <>
      <Modal
        opened={isOpened}
        onClose={onClose}
        transitionProps={{ transition: 'slide-up', duration: 300, timingFunction: 'linear' }}
        zIndex="9999"
        size="lg"
        centered>
        {/* {step === 1 && (
          <Vote selectedCode={selectedCode} setSelectedCode={setSelectedCode} store={store} onClose={onClose} />
        )} */}
        {/* {step === 2 && (
          <Confirmed
            selectedCode={selectedCode}
            category={categoryInfo[selectedCode]?.ko}
            store={store}
            onNext={onNext}
            onClose={onPrev}
          />
        )}
        {step === 3 && <Success />} */}
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
