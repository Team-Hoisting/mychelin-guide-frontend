import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { SkinnyContainer, Loader } from '../components/common';
import useUserProfile from '../hooks/useUserProfile';
import { SortedStores, ArchivedStores, ProfileHeader, Tabs } from '../components/profile';

const ProfileWrapper = styled.main`
  width: 85%;
  margin: 0 auto;
`;

const ProfilePage = () => {
  const { nickname: profileUserNickname } = useParams();
  const profileInfo = useUserProfile(profileUserNickname);
  const [renderStatus, setRenderStatus] = React.useState('votedStores');

  const changeToVotedStores = () => setRenderStatus('votedStores');
  const changeToArchivedStores = () => setRenderStatus('archivedStores');

  return (
    <SkinnyContainer>
      <ProfileWrapper>
        <ProfileHeader profileUserNickname={profileUserNickname} isCertified={profileInfo?.user.isCertified} />
        <Tabs
          renderStatus={renderStatus}
          changeToArchivedStores={changeToArchivedStores}
          changeToVotedStores={changeToVotedStores}
        />
        {renderStatus === 'votedStores' ? (
          <SortedStores
            profileUserNickname={profileUserNickname}
            voteStores={profileInfo?.voteStores}
            emptyCategories={profileInfo?.emptyCategories}
          />
        ) : (
          <React.Suspense fallback={<Loader />}>
            <ArchivedStores profileUserNickname={profileUserNickname} />
          </React.Suspense>
        )}
      </ProfileWrapper>
    </SkinnyContainer>
  );
};

export default ProfilePage;
