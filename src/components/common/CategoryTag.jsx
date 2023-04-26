import styled from 'styled-components';
import { categoryInfo } from '../../constants';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px 10px;
  min-width: 70px;
  border-radius: 20px;
  opacity: 0.8;
  background-color: #d9d9d9;
  scale: 0.8;
  color: #000000;
`;
const CategoryIcon = styled.img`
  margin: auto 2px;
  width: 20x;
  height: 20px;
`;

const CatagoryName = styled.span`
  margin: 3px;
  font-size: 15px;
  line-height: 1.5;
`;

const VotedCnt = styled.span`
  margin: 3px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
`;

const CategoryTag = ({ categoryCode, votedCnt, renderName = true }) => {
  console.log('votecnt: ', votedCnt);
  const imgSrc = `/categoryIcons/${categoryInfo[categoryCode].imgFile}.png`;

  return (
    <Container>
      <CategoryIcon src={imgSrc} alt="" />
      {renderName && <CatagoryName>{categoryInfo[categoryCode].ko}</CatagoryName>}
      <VotedCnt>{votedCnt}</VotedCnt>
    </Container>
  );
};

export default CategoryTag;
