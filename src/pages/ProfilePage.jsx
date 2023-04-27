import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import styled from 'styled-components';
import { Tabs } from '@mantine/core';

import ProfileHeader from '../components/profile/ProfileHeader';
import { StoreItem, Button } from '../components/common';
import useUserProfile from '../hooks/useUserProfile';

import userState from '../recoil/atoms/userState';

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
  const profileUserInfo = useUserProfile(nickname);
  const [votedStoreOrder, setVotedStoreOrder] = React.useState([]);
  const dragTargetIdx = React.useRef(null);

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
      <ProfileHeader nickname={nickname} isCertified={profileUserInfo?.user.isCertified} />
      <TabsContainer color="grape" variant="outline" radius="md" defaultValue="voted">
        <TabsList>
          <Tab value="voted">Voted</Tab>
          <Tab value="archived">Archived</Tab>
        </TabsList>
        <Tabs.Panel value="voted" pt="sm">
          {user.nickname === nickname && (
            <Button onClick={() => setVotedStoreOrder(profileUserInfo.voteStores)} red>
              순서 변경
            </Button>
          )}
          {votedStoreOrder.length < 2 ? (
            <StoresGrid>
              {profileUserInfo?.voteStores.map(({ categoryCode, store }) => (
                <StoreItem key={categoryCode} storeName={store.storeName} imgUrl={store.imgUrl} />
              ))}
            </StoresGrid>
          ) : (
            <StoresGrid>
              {profileUserInfo?.voteStores.map(({ categoryCode, store }, idx) => (
                <Draggable
                  key={categoryCode}
                  draggable="true"
                  over={false}
                  onDragStart={() => {
                    handleDragStart(idx);
                  }}
                  onDragEnter={() => {}}
                  onDragLeave={() => {}}
                  onDragOver={() => {}}
                  onDrop={() => {
                    swap(idx);
                  }}>
                  <StoreItem storeName={store.storeName} imgUrl={store.imgUrl} />
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
