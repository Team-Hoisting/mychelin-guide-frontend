import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms';
import Button from './Button';

const Container = styled.div`
  padding: 50px 0 38px;
  border-bottom: 1px solid #ebebeb;
`;

const Title = styled.h2`
  margin: 0;
  padding: 0;
  padding-bottom: 1rem;
  font-size: 1.5rem;
  margin-bottom: 3rem;
  border-bottom: 2px solid #000;
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

  return (
    <Container>
      <Title>프로필 정보</Title>
      <AvatarWrapper>
        <Avatar src="https://via.placeholder.com/100" alt="avatar" />
        <NicknameBox>
          <div className="nickname">{user.nickname}</div>
          <div className="btn-group">
            <Button>이미지 변경</Button>
            <Button>삭제</Button>
          </div>
        </NicknameBox>
      </AvatarWrapper>
    </Container>
  );
};

export default Information;
