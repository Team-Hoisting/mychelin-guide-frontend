import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { userState } from '../../recoil/atoms';
import Button from './Button';

const Container = styled.div`
  padding: 50px 0 38px;
  border-bottom: 1px solid #ebebeb;

  .hidden {
    position: absolute;
    opacity: 0;
    width: 90px;
    height: 35px;
  }
`;

const Title = styled.h2`
  margin: 0;
  padding: 0;
  padding-bottom: 1rem;
  font-size: 1.5rem;
  margin-bottom: 3rem;
  border-bottom: 2px solid #d21312;
`;

const AvatarWrapper = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const NicknameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1.2rem;

  .nickname {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .btn-group {
    display: flex;
    margin-top: 0.5rem;
  }
`;

const Information = () => {
  const user = useRecoilValue(userState);
  const imageRef = React.useRef(null);

  const uploadImage = async e => {
    try {
      const [fileToUpload] = e.target.files;
      const formData = new FormData();
      formData.append('img', fileToUpload);

      const res = await axios.post('/api/upload/user', formData);

      if (res.status !== 200) throw new Error(res.statusText);

      const { success } = res.data;

      if (success) {
        imageRef.current.src = `/img/users/${user.nickname}`;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteUserImage = async () => {
    const res = await axios.delete('/api/upload/user');

    const { success } = res.data;

    if (success) {
      imageRef.current.src = 'https://via.placeholder.com/100';
    }
  };

  return (
    <Container>
      <Title>프로필 정보</Title>
      <AvatarWrapper>
        <Avatar
          src={`/img/users/${user.nickname}`}
          onError={e => {
            e.target.src = 'https://via.placeholder.com/100';
          }}
          ref={imageRef}
        />
        <NicknameBox>
          <div className="nickname">{user.nickname}</div>
          <div className="btn-group">
            <input type="file" accept="image/*" onChange={uploadImage} className="hidden" />
            <Button>이미지 변경</Button>
            <Button onClick={deleteUserImage}>삭제</Button>
          </div>
        </NicknameBox>
      </AvatarWrapper>
    </Container>
  );
};

export default Information;
