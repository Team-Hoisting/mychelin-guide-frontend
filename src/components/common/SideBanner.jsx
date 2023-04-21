import styled from 'styled-components';
import { Divider } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import categoryCodes from '../../constants/categoryCodes';
import categoryInfo from '../../constants/categoryInfo';

const PAGEITEMNUM = 3;

const StoreItemContainer = styled.div`
  margin: 15px;
  padding: 3px;
  height: 80px;
  border-radius: 10px;
`;
const CircleImgContainer = styled.div`
  border-radius: 50%;
`;
const StoreImg = styled.img`
  margin: auto;
  width: 40x;
  height: 40px;
  color: black;
`;
const CategoryName = styled.p`
  font-size: 10px;
`;
const CategoryItem = ({ categoryCode, storeid }) => {
  const imgSrc = `/categoryIcons/${storeid ? '' : 'noColor/'}${categoryInfo[categoryCode].imgFile}.png`;
  return (
    <StoreItemContainer>
      <CircleImgContainer
        onClick={() => {
          // 식당 상세 정보 페이지 이동
        }}>
        <StoreImg src={imgSrc} />
      </CircleImgContainer>
      <CategoryName>{categoryInfo[categoryCode].ko}</CategoryName>
    </StoreItemContainer>
  );
};
const Container = styled.div`
  position: fixed;
  top: 100px;
  right: 40px;
  padding: 5px;
  width: 100px;
  height: fit-content;
  border: 1px solid #d21312;
  border-radius: 10px;
  text-align: center;
`;
const Title = styled.h4`
  margin: 8px auto;
  width: 60px;
  font-size: 15px;
  text-align: center;
  color: #d21312;
`;

const SlideContainer = styled.div`
  margin-top: 35px;
`;

const CarouselContainer = styled(Carousel)`
  margin: 5px;
`;

const SideBanner = () => {
  const userVote = {
    KO01: '26571895',
    JP03: '26571895',
    BS05: '26571895',
    CK07: '26571895',
  };

  return (
    <Container>
      <Title>투표 현황</Title>
      <Divider size="sm" />
      <CarouselContainer
        slideSize="100%"
        height={340}
        orientation="vertical"
        slideGap="xs"
        controlsOffset="sm"
        controlSize={15}
        loop
        draggable={false}>
        {Array.from({ length: categoryCodes.length / PAGEITEMNUM }, (_, i) => i).map(pageIdx => (
          <Carousel.Slide key={pageIdx}>
            <SlideContainer>
              {Array.from({ length: PAGEITEMNUM }, (_, i) => PAGEITEMNUM * pageIdx + i).map(categoryIdx => (
                <CategoryItem
                  key={categoryCodes[categoryIdx]}
                  categoryCode={categoryCodes[categoryIdx]}
                  storeid={userVote[categoryCodes[categoryIdx]]}
                />
              ))}
            </SlideContainer>
          </Carousel.Slide>
        ))}
      </CarouselContainer>
    </Container>
  );
};
export default SideBanner;
