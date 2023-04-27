import React from 'react';
import styled from 'styled-components';
import { BiLink } from 'react-icons/bi';

const Container = styled.div`
  display: flex;
  margin: 50px;
`;

const ProfileImg = styled.img`
  margin: 15px;
  width: 100px;
  height: 100%;
`;

const ProfileInfoBox = styled.div``;

const NickName = styled.h4`
  display: flex;
  margin: 30px 0 5px;
  font-size: 20px;
  line-height: 100%;
`;

const CertifiedIcon = styled.img.attrs({ src: '/images/certified.png' })`
  margin: auto 2px;
  height: 20px;
`;

const RecommendationLinkBox = styled.div`
  display: flex;
`;

const LinkIcon = styled(BiLink)`
  margin: auto 0;
  width: 20px;
  height: 20px;
`;

const RecommendationLink = styled.span`
  margin: 5px;
  height: 15px;
  font-size: 15px;
  line-height: 100%;
`;

// imgUrl, nickname, isCertified, link
const ProfileHeader = ({ nickname, isCertified }) => (
  <Container>
    <ProfileImg src="/images/star-light.png" />
    <ProfileInfoBox>
      <NickName>
        {nickname}
        {isCertified && <CertifiedIcon />}
      </NickName>
      <RecommendationLinkBox>
        <LinkIcon />
        <RecommendationLink>link</RecommendationLink>
      </RecommendationLinkBox>
    </ProfileInfoBox>
  </Container>
);

export default ProfileHeader;
