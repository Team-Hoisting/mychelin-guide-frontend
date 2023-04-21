import React from 'react';
import styled from 'styled-components';
import { categoryInfo } from '../../constants';
import categoryCodes from '../../constants/categoryCodes';

const Container = styled.div`
  /* border: 2px dotted green; */
  height: 100px;
  padding: 15px;
  margin: 20px 0 20px 0;
  display: grid;
  grid-template-columns: repeat(13, 1fr);
`;

const EachCategoryBox = styled.div`
  text-align: center;
  cursor: pointer;

  :hover > img {
    width: 53%;
    transition: 0.1s ease-in-out;
  }

  :hover > p {
    font-weight: 600;
    transition: 0.1s ease-in-out;
  }
`;

const CategoryIcon = styled.img`
  width: 50%;
  transition: 0.1s ease-in-out;
`;

const CategoryName = styled.p`
  margin: 0;
`;

const Categories = () => (
  <Container>
    <EachCategoryBox>
      <CategoryIcon src="./public/images/fork-spoon.png" alt="전체" />
      <CategoryName>전체 보기</CategoryName>
    </EachCategoryBox>
    {categoryCodes.map(code => {
      const imgSrc = `./public/categoryIcons/${categoryInfo[code].imgFile}.png`;

      return (
        <EachCategoryBox key={`${categoryInfo[code].ko}`}>
          <CategoryIcon src={imgSrc} alt={`${categoryInfo[code].ko}`} />
          <CategoryName>{categoryInfo[code].ko}</CategoryName>
        </EachCategoryBox>
      );
    })}
  </Container>
);

export default Categories;
