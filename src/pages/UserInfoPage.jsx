import React from 'react';
import styled from 'styled-components';
import ImageInfo from '../components/userinfo/ImageInfo';
import LoginInfo from '../components/userinfo/LoginInfo';

const Container = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1024px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 768px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const UserInfoPage = () => {
  console.log('');

  return (
    <Container>
      <ImageInfo />
      <LoginInfo />
    </Container>
  );
};

export default UserInfoPage;
