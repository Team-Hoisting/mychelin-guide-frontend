import React from 'react';
import { Modal, Group, Button } from '@mantine/core';
import Vote from '../modal/Vote';
import Confirmed from '../modal/Confirmed';
import Success from '../modal/Success';

const PopupModal = ({ withCloseButton, title, btnText, btnBgColor, btnColor, duration }) => {
  const [step, setStep] = React.useState(1);
  const [isOpened, setIsOpened] = React.useState(false);

  React.useEffect(() => {
    if (!isOpened) return;

    setStep(1);
  }, [isOpened]);

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
        {step === 1 && <Vote notFixed={true} onNext={onNext} onClose={onClose} />}
        {step === 2 && <Confirmed onNext={onNext} onClose={onPrev} />}
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
