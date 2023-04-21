import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  height: 350px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 30px;
  position: relative;
  transition: 0.1s ease-in-out;
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
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: #fff;
  font-weight: 500;
  font-size: 18px;
`;

const Name = styled(Link)`
  padding: 8px 2px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  width: 50%;
  overflow: hidden;
`;

const StarContainer = styled.div``;

const Star = styled.img.attrs({
  src: '/images/star.png',
})`
  width: 28px;
`;

const StoreItem = ({ storeName = '', imgUrl = '', starCnt = 0, topThree = false }) => (
  <>
    <Container topThree={topThree}>
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
