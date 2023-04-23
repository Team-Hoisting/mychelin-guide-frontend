import { useState } from 'react';
import { Modal, Group, Button } from '@mantine/core';

/*
  트리거
  첫 번째 모달 (투표하기, 취소)
  투표하기 버튼 클릭
  두 번째 모달 optional? (확인, 취소)
  확인 버튼 클릭
  세 번째 모달 (메인 이동, 닫기)
*/

const PopupModal = ({ withCloseButton, title, btnText, btnBgColor, btnColor, duration, children }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <Modal
        centered
        size="lg"
        withCloseButton={withCloseButton}
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        title={title}
        transitionProps={{ transition: 'fade', duration: duration || 300, timingFunction: 'linear' }}>
        {children}
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
