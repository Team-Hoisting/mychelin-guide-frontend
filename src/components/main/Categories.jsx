import React from 'react';
import styled from 'styled-components';
import { AiOutlineLine } from 'react-icons/ai';
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
  transition: 0.3s ease-in;
  position: relative;

  :hover::after {
    content: ;
  }

  :hover > img {
    scale: 1.1;
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

const SelectedIcon = styled(AiOutlineLine)`
  color: var(--primary-color);
  position: absolute;
  font-size: 20px;
  top: 70px;
  left: 39px;
  display: ${({ selected }) => (selected ? 'block' : 'none')};
`;

const Categories = ({ category, changeCategory }) => (
  <Container>
    {categoryCodes.map(code => {
      const imgSrc = `./public/categoryIcons/${categoryInfo[code].imgFile}.png`;

      return (
        <EachCategoryBox key={`${categoryInfo[code].ko}`} onClick={() => changeCategory(code)}>
          <SelectedIcon selected={category === code} />
          <CategoryIcon src={imgSrc} alt={`${categoryInfo[code].ko}`} />
          <CategoryName>{categoryInfo[code].ko}</CategoryName>
        </EachCategoryBox>
      );
    })}
  </Container>
);

export default Categories;
