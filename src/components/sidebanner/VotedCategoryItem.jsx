import React from 'react';
import styled from 'styled-components';
import categoryInfo from '../../constants/categoryInfo';

const Container = styled.div`
  margin: 15px;
  padding: 3px;
  height: 80px;
  border-radius: 10px;
`;

const StoreImg = styled.img`
  margin: auto;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  color: var(--font-color);
`;

const CategoryName = styled.p`
  font-size: 13px;
`;

const VotedCategoryItem = ({ categoryCode, storeImg }) => {
  const imgSrc = storeImg ?? `/categoryIcons/noColor/${categoryInfo[categoryCode].imgFile}.png`;

  return (
    <Container>
      <StoreImg src={imgSrc} />
      <CategoryName>{categoryInfo[categoryCode].ko}</CategoryName>
    </Container>
  );
};

export default VotedCategoryItem;
