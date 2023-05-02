import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms';

const Container = styled.div`
  display: flex;
  margin: 30px 0;
`;

const ProfileImg = styled.img`
  margin: 15px;
  width: 120px;
  border-radius: 50%;
`;

const NickName = styled.div`
  display: flex;
  margin: auto 5px;
  font-size: 30px;
  font-weight: 500;
`;

const CertifiedIcon = styled.img.attrs({ src: '/images/certified.png' })`
  margin: auto 5px;
  height: 30px;
`;

// imgUrl, nickname, isCertified, link
const ProfileHeader = ({ profileUserNickname, isCertified }) => {
  const user = useRecoilValue(userState);

  return (
    <Container>
      <ProfileImg
        src={`/img/users/${user.nickname}`}
        onError={e => {
          e.target.src = '/images/default-user-image.png';
        }}
      />
      <NickName>
        {profileUserNickname}
        {isCertified && <CertifiedIcon />}
      </NickName>
    </Container>
  );
};

export default ProfileHeader;
