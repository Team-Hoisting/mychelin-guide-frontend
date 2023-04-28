import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import categoryInfo from '../../constants/categoryInfo';

const jump = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 1px 2px rgba(0,0,0,.15);
  }
  100% {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0,0,0,.1);
  }
`;

const animation = css`
  animation: ${jump} 0.4s infinite alternate;
`;

const Container = styled.div`
  padding: 15px;
  width: 100%;
  overflow: hidden;
  height: 360px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 30px;
  position: relative;
  transition: 0.1s ease-in-out;
  background-color: var(--bg-color);
  color: var(--font-color);
  border-radius: 30px;

  ${props => props.isEditing && animation}
`;

const CategoryTitle = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const CategoryIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const CategoryName = styled.h5`
  margin: auto 10px;
  font-size: 20px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 60%;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const StoreName = styled.h5`
  margin-top: 15px;
  font-weight: 500;
  font-size: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  width: 100%;
`;

const VotedStoreItem = ({ categoryCode, storeId, storeName, imgUrl, isEditing = false }) => (
  <Container isEditing={isEditing}>
    <CategoryTitle>
      <CategoryIcon src={`/categoryIcons/${categoryInfo[categoryCode].imgFile}.png`} />
      <CategoryName>{categoryInfo[categoryCode].ko}</CategoryName>
    </CategoryTitle>
    <Link to={`/store/${storeId}`}>
      <ImageContainer>
        <Img src={imgUrl} />
      </ImageContainer>
    </Link>
    <StoreName>{storeName}</StoreName>
  </Container>
);

export default VotedStoreItem;
