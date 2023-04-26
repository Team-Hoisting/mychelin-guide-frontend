import React from 'react';
import styled from 'styled-components';
import Unit from './Unit';

const Container = styled.div`
  padding-top: 38px;
  max-width: 480px;
`;

const Title = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1.3rem;
  letter-spacing: -0.27px;
`;

const LoginInfo = () => {
  console.log('');

  return (
    <Container>
      <Title>로그인 정보</Title>
      <Unit title="닉네임" />
      <Unit title="비밀번호" />
    </Container>
  );
};

export default LoginInfo;
