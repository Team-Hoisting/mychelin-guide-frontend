import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin: 50px;
`;

const ProfileImg = styled.img`
  margin: 15px;
  width: 130px;
  height: 100%;
`;

const NickName = styled.div`
  display: flex;
  margin: auto 5px;
  font-size: 30px;
  font-weight: 500;
  line-height: 100%;
`;

const CertifiedIcon = styled.img.attrs({ src: '/images/certified.png' })`
  margin: auto 5px;
  height: 30px;
`;

// imgUrl, nickname, isCertified, link
const ProfileHeader = ({ profileUserNickname, isCertified }) => (
  <Container>
    <ProfileImg src="/images/star-light.png" />
    <NickName>
      {profileUserNickname}
      {isCertified && <CertifiedIcon />}
    </NickName>
  </Container>
);

export default ProfileHeader;
