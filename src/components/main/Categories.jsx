import React from 'react';
import styled from 'styled-components';
import { categoryInfo } from '../../constants';
import categoryCodes from '../../constants/categoryCodes';
import { CategoryBox } from '../common';

const Container = styled.div`
  height: 100px;
  padding: 15px;
  margin: 20px 0 20px 0;
  display: grid;
  grid-template-columns: repeat(13, 1fr);
`;

const Categories = ({ category, changeCategory }) => (
  <Container>
    {categoryCodes.map(code => (
      <CategoryBox
        categoryName={categoryInfo[code].ko}
        categoryImgFile={categoryInfo[code].imgFile}
        colored
        key={categoryInfo[code].ko}
        clickHandler={() => changeCategory(code)}
        selected={category === code}
      />
    ))}
  </Container>
);

export default Categories;
