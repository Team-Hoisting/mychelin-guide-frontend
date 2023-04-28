import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Tabs } from '@mantine/core';
import ProfileHeader from '../components/profile/ProfileHeader';
import { SkinnyContainer } from '../components/common';
import useUserProfile from '../hooks/useUserProfile';
import SortedStores from '../components/profile/SortedStores';
import ArchivedStores from '../components/profile/ArchivedStores';

const TabsContainer = styled(Tabs)`
  margin: 20px;
`;

const TabsList = styled(Tabs.List)`
  border-bottom: 1px solid var(--primary-color);
`;

const Tab = styled(Tabs.Tab)`
  margin-right: 2px;
  width: 150px;
  height: 50px;
  color: #ababab;
  font-size: 20px;
  font-weight: 600;

  &[data-active] {
    color: var(--primary-color);
    border-color: var(--primary-color);
    border-bottom: none;
  }
`;

const ProfilePage = () => {
  const { nickname: profileUserNickname } = useParams();
  const profileInfo = useUserProfile(profileUserNickname);

  return (
    <SkinnyContainer>
      <ProfileHeader profileUserNickname={profileUserNickname} isCertified={profileInfo?.user.isCertified} />
      <TabsContainer color="grape" variant="outline" radius="md" defaultValue="voted">
        <TabsList>
          <Tab value="voted">Voted</Tab>
          <Tab value="archived">Archived</Tab>
        </TabsList>
        <Tabs.Panel value="voted" pt="sm">
          <SortedStores
            profileUserNickname={profileUserNickname}
            voteStores={profileInfo?.voteStores}
            emptyCategories={profileInfo?.emptyCategories}
          />
        </Tabs.Panel>
        <Tabs.Panel value="archived" pt="sm">
          <ArchivedStores profileUserNickname={profileUserNickname} />
        </Tabs.Panel>
      </TabsContainer>
    </SkinnyContainer>
  );
};

export default ProfilePage;
