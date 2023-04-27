import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import styled from 'styled-components';
import { Tabs } from '@mantine/core';

import ProfileHeader from '../components/profile/ProfileHeader';
import { StoreItem, Button } from '../components/common';
import useUserProfile from '../hooks/useUserProfile';

import userState from '../recoil/atoms/userState';
import { changeVotedCategoryOrder } from '../api/users';

const TabsContainer = styled(Tabs)`
  margin: 20px;
  border-color: var(--primary-color);
`;

const TabsList = styled(Tabs.List)`
  border-color: var(--primary-color);
`;

const Tab = styled(Tabs.Tab)`
  margin-right: 2px;
  border-color: var(--primary-color);
  background-color: var(--primary-color);
  color: white;

  &[data-active] {
    background-color: var(--bg-color);
    border-color: var(--primary-color);
    color: var(--font-color);
  }
`;

const StoresGrid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
`;

const Draggable = styled.div``;

const ProfilePage = () => {
  const user = useRecoilValue(userState);
  const { nickname } = useParams();
  const { profileInfo, isLoading } = useUserProfile(nickname);
  const [isEditing, setIsEditing] = React.useState(false);
  const [votedStoreOrder, setVotedStoreOrder] = React.useState([]);
  const dragTargetIdx = React.useRef(null);

  React.useEffect(() => {
    if (!isLoading) setVotedStoreOrder(profileInfo.voteStores);
  }, [isLoading, profileInfo?.voteStores]);

  const swap = idx => {
    if (dragTargetIdx.current === idx) return;

    const newVotedStoreOrder = [...votedStoreOrder];
    [newVotedStoreOrder[dragTargetIdx.current], newVotedStoreOrder[idx]] = [
      newVotedStoreOrder[idx],
      newVotedStoreOrder[dragTargetIdx.current],
    ];

    setVotedStoreOrder(newVotedStoreOrder);
  };

  const handleDragStart = idx => {
    dragTargetIdx.current = idx;
  };

  return (
    <>
      <ProfileHeader nickname={nickname} isCertified={profileInfo?.user.isCertified} />
      <TabsContainer color="grape" variant="outline" radius="md" defaultValue="voted">
        <TabsList>
          <Tab value="voted">Voted</Tab>
          <Tab value="archived">Archived</Tab>
        </TabsList>
        <Tabs.Panel value="voted" pt="sm">
          {user.nickname === nickname && (
            <>
              {isEditing ? (
                <Button
                  onClick={() => {
                    changeVotedCategoryOrder(
                      nickname,
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
                  draggable="true"
                  over={false}
                  onDragStart={() => {
                    handleDragStart(idx);
                  }}
                  onDragEnter={() => {}}
                  onDragLeave={() => {}}
                  onDragOver={e => e.preventDefault()}
                  onDrop={() => {
                    swap(idx);
                  }}>
                  <StoreItem draggable="true" storeName={store.storeName} imgUrl={store.imgUrl} />
                </Draggable>
              ))}
            </StoresGrid>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="archived" pt="sm"></Tabs.Panel>
      </TabsContainer>
    </>
  );
};

export default ProfilePage;
