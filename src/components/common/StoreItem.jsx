import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
`;

const ImageContainer = styled.div`
  /* ${({ imgUrl }) =>
    imgUrl
      ? `
        background-image: url(${imgUrl});
        background-size: cover;
        background-position: center;
      `
      : `
    background-color: gray;
  `} */
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

const Content = styled.div`
  padding: 5px;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

const Name = styled(Link)`
  padding: 8px 2px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  width: 50%;
  overflow: hidden;
  font-weight: 400;
`;

const StarContainer = styled.div``;

const Star = styled.img.attrs({
  src: '/images/star.png',
})`
  width: 28px;
`;

const StoreItem = ({ storeName = '', imgUrl = '', starCnt = 0, topThree = false }) => (
  <Container topThree={topThree}>
    <Link to="/detail">
      <ImageContainer imgUrl={imgUrl}>
        <Img src={imgUrl} />
      </ImageContainer>
    </Link>
    <Content>
      <Name>{storeName}</Name>
      <StarContainer>
        {[...Array(starCnt).keys()].map(val => (
          <Star key={val} />
        ))}
      </StarContainer>

      {/* 카테고리 라벨 */}
    </Content>
  </Container>
);

export default StoreItem;
