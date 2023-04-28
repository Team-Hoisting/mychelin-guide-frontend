import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Modal, Group, Button } from '@mantine/core';
import userState from '../../recoil/atoms/userState';
import themeState from '../../recoil/atoms/theme';
import CategorySelector from '../modal/CategorySelector';

const PopupModal = ({ width, isOpened, setIsOpened, phase, setPhase, storeId }) => {
  const theme = useRecoilValue(themeState);
  const [categoryCode, setCategoryCode] = React.useState('none'); // 선택한 카테고리

  return (
    <>
      <Modal
        opened={isOpened}
        onClose={() => {
          setIsOpened(false);
          setPhase('none');
        }}
        transitionProps={{ transition: 'slide-up', duration: 300, timingFunction: 'linear' }}
        zIndex="9999"
        size="lg"
        centered
        styles={{
          header: { backgroundColor: `${theme === 'light' ? '#fff' : '#22272e'}` },
          body: { backgroundColor: `${theme === 'light' ? '#fff' : '#22272e'}` },
        }}>
        {phase === 'select' && <CategorySelector storeId={storeId} categoryCode={categoryCode} />}
        {/* {step === 1 ? (
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
        )} */}
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

  const [isOpened, setIsOpened] = React.useState(false); // 모달 토글
  const [phase, setPhase] = React.useState('none'); // none -> select -> category -> store -> success

  if (!user || !isOpened)
    return (
      <Group position="center">
        <Button
          onClick={() => {
            if (!user) navigate('/signin');
            else {
              setIsOpened(true);
              setPhase('select');
            }
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

  return (
    <PopupModal
      width={width}
      isOpened={isOpened}
      setIsOpened={setIsOpened}
      phase={phase}
      setPhase={setPhase}
      storeId={storeId}
    />
  );
};

export default ModalContainer;
