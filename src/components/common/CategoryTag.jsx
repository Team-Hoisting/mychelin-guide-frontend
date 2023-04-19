import styled from 'styled-components';
import category from '../../constants/category';

const Container = styled.div`
  display: flex;
  padding: 5px 10px;
  width: fit-content;
  border-radius: 15px;
  background-color: #d21312;
  opacity: 0.8;
`;
const CategoryIcon = styled.img`
  margin: auto 2px;
  width: 20x;
  height: 20px;
`;

const CatagoryName = styled.span`
  margin: 3px;
  color: white;
  font-size: 15px;
  line-height: 1.5;
`;

const VotedCnt = styled.span`
  margin: 3px;
  color: white;
  font-size: 15px;
  line-height: 1.5;
`;

const CategoryTag = ({ categoryCode, votedCnt }) => {
  const imgSrc = `./public/categoryIcons/${category[categoryCode].imgFile}.png`;

  return (
    <Container>
      <CategoryIcon src={imgSrc} alt="" />
      <CatagoryName>{category[categoryCode].ko}</CatagoryName>
      <VotedCnt>{votedCnt}</VotedCnt>
    </Container>
  );
};

export default CategoryTag;
