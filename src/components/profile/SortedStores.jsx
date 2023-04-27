import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import userState from '../../recoil/atoms/userState';

import { StoreItem, Button } from '../common';
import Draggable from './Draggable';

import { changeVotedCategoryOrder } from '../../api/users';

const StoresGrid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
`;

const SortedStores = ({ profileUserNickname, initialOrder }) => {
  const user = useRecoilValue(userState);
  const [votedStoreOrder, setVotedStoreOrder] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const dragTargetIdx = React.useRef(null);

  React.useEffect(() => {
    if (initialOrder) setVotedStoreOrder(initialOrder);
  }, [initialOrder]);

  const setDragTargetIdx = idx => {
    dragTargetIdx.current = idx;
  };

  const swap = idx => {
    if (dragTargetIdx.current === idx) return;

    const newVotedStoreOrder = [...votedStoreOrder];
    [newVotedStoreOrder[dragTargetIdx.current], newVotedStoreOrder[idx]] = [
      newVotedStoreOrder[idx],
      newVotedStoreOrder[dragTargetIdx.current],
    ];

    setVotedStoreOrder(newVotedStoreOrder);
  };

  return (
    <>
      {user.nickname === profileUserNickname && (
        <>
          {isEditing ? (
            <Button
              onClick={() => {
                changeVotedCategoryOrder(
                  profileUserNickname,
                  votedStoreOrder.map(({ categoryCode }) => categoryCode)
                );
                setIsEditing(false);
              }}
              gray>
              수정
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)} red>
              순서 변경
            </Button>
          )}
        </>
      )}
      {!isEditing ? (
        <StoresGrid>
          {votedStoreOrder.map(({ categoryCode, store }) => (
            <StoreItem key={categoryCode} storeName={store.storeName} imgUrl={store.imgUrl} />
          ))}
        </StoresGrid>
      ) : (
        <StoresGrid>
          {votedStoreOrder.map(({ categoryCode, store }, idx) => (
            <Draggable
              key={categoryCode}
              dragStartHandler={() => {
                setDragTargetIdx(idx);
              }}
              dropHandler={() => {
                swap(idx);
              }}>
              <StoreItem storeName={store.storeName} imgUrl={store.imgUrl} />
            </Draggable>
          ))}
        </StoresGrid>
      )}
    </>
  );
};

export default SortedStores;
