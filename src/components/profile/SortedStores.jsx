import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import userState from '../../recoil/atoms/userState';
import { Button } from '../common';
import Draggable from './Draggable';
import ProfileStoreItem from './ProfileStoreItem';
import { changeVotedCategoryOrder } from '../../api/users';
import EmptyStoreItem from './EmptyStoreItem';

const Container = styled.div`
  text-align: right;
`;

const EditButton = styled(Button)`
  margin: 5px 5px 15px 5px;
  width: 100px;
  height: 40px;
  font-size: 15px;
  font-weight: 450;
`;

const StoresGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const SortedStores = ({ profileUserNickname, voteStores, emptyCategories }) => {
  const user = useRecoilValue(userState);
  const [votedStoreOrder, setVotedStoreOrder] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const dragTargetIdx = React.useRef(null);

  React.useEffect(() => {
    if (voteStores) setVotedStoreOrder(voteStores);
  }, [voteStores]);

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
    <Container>
      {user.nickname === profileUserNickname && (
        <>
          {isEditing ? (
            <EditButton
              onClick={() => {
                changeVotedCategoryOrder(
                  profileUserNickname,
                  votedStoreOrder.map(({ categoryCode }) => categoryCode)
                );
                setIsEditing(false);
              }}
              gray>
              확인
            </EditButton>
          ) : (
            <EditButton onClick={() => setIsEditing(true)} red>
              순서 변경
            </EditButton>
          )}
        </>
      )}
      {
        <StoresGrid>
          {!isEditing
            ? votedStoreOrder.map(({ categoryCode, store }) => (
                <ProfileStoreItem
                  key={categoryCode}
                  categoryCode={categoryCode}
                  storeId={store.storeId}
                  storeName={store.storeName}
                />
              ))
            : votedStoreOrder.map(({ categoryCode, store }, idx) => (
                <Draggable
                  key={categoryCode}
                  dragStartHandler={() => {
                    setDragTargetIdx(idx);
                  }}
                  dropHandler={() => {
                    swap(idx);
                  }}>
                  <ProfileStoreItem
                    categoryCode={categoryCode}
                    storeId={store.storeId}
                    storeName={store.storeName}
                    isEditing={true}
                  />
                </Draggable>
              ))}
          {emptyCategories?.map(code => (
            <EmptyStoreItem key={code} categoryCode={code} />
          ))}
        </StoresGrid>
      }
    </Container>
  );
};

export default SortedStores;
