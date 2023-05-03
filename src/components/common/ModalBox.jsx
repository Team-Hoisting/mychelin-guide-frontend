import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Modal, Group, Button } from '@mantine/core';
import userState from '../../recoil/atoms/userState';
import themeState from '../../recoil/atoms/themeState';
import { CategorySelector, SameCategoryChecker, SameStoreChecker, SuccessVerifier } from '../modal';

const PopupModal = ({ width, isOpened, setIsOpened, phase, setPhase, storeId, store }) => {
  const theme = useRecoilValue(themeState);
  const [categoryCode, setCategoryCode] = React.useState('none'); // 선택한 카테고리
  const [taskQueue, setTaskQueue] = React.useState([]);

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
        {phase === 'select' && (
          <CategorySelector
            setIsOpened={setIsOpened}
            setPhase={setPhase}
            setTaskQueue={setTaskQueue}
            storeId={storeId}
            store={store}
            categoryCode={categoryCode}
            setCategoryCode={setCategoryCode}
          />
        )}
        {phase === 'category' && (
          <SameCategoryChecker
            setPhase={setPhase}
            setTaskQueue={setTaskQueue}
            storeId={storeId}
            store={store}
            categoryCode={categoryCode}
          />
        )}
        {phase === 'store' && (
          <SameStoreChecker
            setPhase={setPhase}
            setIsOpened={setIsOpened}
            setTaskQueue={setTaskQueue}
            storeId={storeId}
            categoryCode={categoryCode}
          />
        )}
        {phase === 'success' && <SuccessVerifier storeId={storeId} setTaskQueue={setTaskQueue} taskQueue={taskQueue} />}
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

const ModalBox = ({ store, storeId, width }) => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isOpened, setIsOpened] = React.useState(false);
  const [phase, setPhase] = React.useState('none');

  if (!user || !isOpened)
    return (
      <Group position="center">
        <Button
          onClick={() => {
            if (!user) navigate('/signin', { state: pathname });
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
      store={store}
    />
  );
};

export default ModalBox;
