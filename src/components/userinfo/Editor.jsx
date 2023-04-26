import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: -0.07px;
  color: rgba(34, 34, 34, 0.5);
`;

const Editor = () => {
  console.log('');

  return (
    <Container>
      <Title>새로운 이름</Title>
    </Container>
  );
};

export default Editor;
