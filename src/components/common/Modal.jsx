import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Modal, Group, Button } from '@mantine/core';
import { categoryInfo } from '../../constants';
import Vote from '../modal/Vote';
import Confirmed from '../modal/Confirmed';
import Success from '../modal/Success';
import { fetchStore } from '../../api/stores';

const PopupModal = ({ storeId, withCloseButton, title, btnText, btnBgColor, btnColor, duration }) => {
  const [step, setStep] = React.useState(1);
  const [isOpened, setIsOpened] = React.useState(false);
  const [selectedCode, setSelectedCode] = React.useState(null);

  React.useEffect(() => {
    if (!isOpened) return;

    setStep(1);
    setSelectedCode(null);
  }, [isOpened]);

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

  const onPrev = () => {
    if (step === 1) return;

    setStep(step - 1);
  };

  const onNext = () => {
    if (step === 3) return;

    setStep(step + 1);
  };

  const onClose = () => {
    setIsOpened(false);
  };

  return (
    <>
      <Modal
        zIndex="9999"
        centered
        size="lg"
        withCloseButton={withCloseButton}
        opened={isOpened}
        onClose={onClose}
        title={title}
        transitionProps={{ transition: 'slide-up', duration: duration || 300, timingFunction: 'linear' }}>
        {step === 1 && (
          <Vote
            selectedCode={selectedCode}
            setSelectedCode={setSelectedCode}
            store={store}
            notFixed={true}
            onNext={onNext}
            onClose={onClose}
          />
        )}
        {step === 2 && (
          <Confirmed
            selectedCode={selectedCode}
            category={categoryInfo[selectedCode]?.ko}
            store={store}
            onNext={onNext}
            onClose={onPrev}
          />
        )}
        {step === 3 && <Success />}
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
              backgroundColor: btnBgColor || '#ababab',
              color: btnColor || '#000',
              '&:not([data-disabled])': theme.fn.hover({
                backgroundColor: theme.fn.darken(btnBgColor || '#ababab', 0.05),
              }),
            },
          })}>
          {btnText}
        </Button>
      </Group>
    </>
  );
};

export default PopupModal;
