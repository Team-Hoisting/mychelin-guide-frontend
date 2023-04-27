import React from 'react';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';
import { Tabs } from '@mantine/core';

import ProfileHeader from '../components/profile/ProfileHeader';

import useUserProfile from '../hooks/useUserProfile';

import SortedStores from '../components/profile/SortedStores';
import ArchivedStores from '../components/profile/ArchivedStores';

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

const ProfilePage = () => {
  const { nickname: profileUserNickname } = useParams();
  const { profileInfo } = useUserProfile(profileUserNickname);

  return (
    <>
      <ProfileHeader profileUserNickname={profileUserNickname} isCertified={profileInfo?.user.isCertified} />
      <TabsContainer color="grape" variant="outline" radius="md" defaultValue="voted">
        <TabsList>
          <Tab value="voted">Voted</Tab>
          <Tab value="archived">Archived</Tab>
        </TabsList>
        <Tabs.Panel value="voted" pt="sm">
          <SortedStores profileUserNickname={profileUserNickname} initialOrder={profileInfo?.voteStores} />
        </Tabs.Panel>
        <Tabs.Panel value="archived" pt="sm">
          <ArchivedStores profileUserNickname={profileUserNickname} />
        </Tabs.Panel>
      </TabsContainer>
    </>
  );
};

export default ProfilePage;
