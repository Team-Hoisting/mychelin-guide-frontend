import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const Container = styled.div`
  max-width: 240px;
  height: 200px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 12px;
  padding: 12px;
  margin: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img.attrs({
  src: '/images/fork-spoon.png',
})`
  width: 40px;
  display: block;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoundedButton = styled(Button)`
  width: 80%;
  height: 44px;
  margin: 6px;
  border: none;
  border-radius: 12px;
`;

const StoreItemOnHover = ({ handleMouseOut }) => (
  <Container onMouseLeave={handleMouseOut}>
    <Img />
    <ButtonContainer>
      <RoundedButton gray>상세보기</RoundedButton>
      <RoundedButton red>투표하기</RoundedButton>
    </ButtonContainer>
  </Container>
);

export default StoreItemOnHover;
