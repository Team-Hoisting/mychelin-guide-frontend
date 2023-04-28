import React from 'react';
import styled from 'styled-components';
import categoryInfo from '../../constants/categoryInfo';

const Container = styled.div`
  padding: 15px;
  width: 100%;
  height: 360px;
  position: relative;
  transition: 0.1s ease-in-out;
  color: var(--font-color);
  border: thick dashed #ababab;
  border-radius: 30px;
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
  color: #ababab;
`;

const EmptyStoreItem = ({ categoryCode }) => (
  <>
    <Container>
      <CategoryTitle>
        <CategoryIcon src={`/categoryIcons/noColor/${categoryInfo[categoryCode].imgFile}.png`} />
        <CategoryName>{categoryInfo[categoryCode].ko}</CategoryName>
      </CategoryTitle>
    </Container>
  </>
);

export default EmptyStoreItem;
