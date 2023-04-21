import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const Container = styled.div`
  /* width: ${({ topThree }) => (topThree ? '30%' : '100%')}; */
  width: ${({ topThree }) => (topThree ? '400px' : '290px')};
  min-width: ${({ topThree }) => (topThree ? '400px' : '290px')};
  overflow: hidden;
  height: 350px;
  background-color: #fff;
  border: 1px solid red;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  position: relative;
  transition: 0.1s ease-in-out;

  :hover {
    scale: 1.02;
  }

  :hover > main {
    transition: 0.1s ease-in-out;
    background-color: rgba(0, 0, 0, 0.8);

    div {
      display: flex;
    }

    img {
      display: block;
    }
  }
`;

const ImageContainer = styled.div`
  background-color: #ababab;
  width: 400px;
  height: 250px;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const Contents = styled.section`
  padding: 5px;
  display: flex;
  align-items: center;
  background-color: #fff;
`;

const Name = styled(Link)`
  padding: 8px 2px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  width: 50%;
  overflow: hidden;
  font-weight: 500;
  font-size: 16px;
`;

const StarContainer = styled.div``;

const Star = styled.img.attrs({
  src: '/images/star.png',
})`
  width: 28px;
`;

const HoverContainer = styled.main`
  z-index: 9999;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HoverItemIcon = styled.img.attrs({
  src: '/images/fork-spoon.png',
})`
  width: 60px;
  display: none;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  width: 250px;
  display: none;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const RoundedButton = styled(Button)`
  width: 200px;
  height: 44px;
  margin: 6px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
`;

const StoreItem = ({ storeName = '', imgUrl = '', starCnt = 0, topThree = false }) => (
  <>
    <Container topThree={topThree}>
      <HoverContainer>
        <HoverItemIcon />
        <ButtonContainer>
          <Link to="/detail">
            <RoundedButton gray>상세보기</RoundedButton>
          </Link>
          <RoundedButton red>투표하기</RoundedButton>
        </ButtonContainer>
      </HoverContainer>
      <Link to="/detail">
        <ImageContainer imgUrl={imgUrl}>
          <Img src={imgUrl} />
        </ImageContainer>
      </Link>
      <Contents>
        <Name>{storeName}</Name>
        <StarContainer>
          {[...Array(starCnt).keys()].map(val => (
            <Star key={val} />
          ))}
        </StarContainer>
      </Contents>
    </Container>
  </>
);
// s;

export default StoreItem;
