import styled from 'styled-components';
import { Divider } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import category from '../../constants/category';

const CATEGORYNUM = 12;
const PAGEITEMNUM = 3;

const StoreItemContainer = styled.div`
  margin: 5px;
  padding: 3px;
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
  font-size: 2px;
`;

const CategoryItem = ({ categoryCode, storeid }) => {
  const imgSrc = `./public/categoryIcons/${storeid ? '' : 'noColor/'}${category[categoryCode].imgFile}.png`;
  return (
    <StoreItemContainer>
      <CircleImgContainer
        onClick={() => {
          // 식당 상세 정보 페이지 이동
        }}>
        <StoreImg src={imgSrc} />
      </CircleImgContainer>
      <CategoryName>{category[categoryCode].ko}</CategoryName>
    </StoreItemContainer>
  );
};

const Container = styled.div`
  padding: 5px;
  width: 70px;
  height: 100%;
  border: 1px solid #d21312;
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.p`
  width: 60px;
  font-size: 5px;
  text-align: center;
  color: #d21312;
`;

const SlideContainer = styled.div`
  margin-top: 35px;
`;

const SideBanner = ({ email }) => {
  const userVotes = [
    { category: 0, storeid: '26571895', date: new Date() },
    {},
    { category: 2, storeid: '26571895', date: new Date() },
    {},
    { category: 4, storeid: '26571895', date: new Date() },
    {},
    { category: 6, storeid: '26571895', date: new Date() },
    {},
    {},
    {},
    {},
    {},
  ];

  return (
    <Container>
      <Title>투표 현황</Title>
      <Divider size="xs" />
      <Carousel
        slideSize="100%"
        height={280}
        orientation="vertical"
        slideGap="xs"
        controlsOffset="sm"
        controlSize={15}
        loop
        draggable={false}>
        {Array.from({ length: CATEGORYNUM / PAGEITEMNUM }, (_, i) => i).map(pageIdx => (
          <Carousel.Slide key={pageIdx}>
            <SlideContainer>
              {Array.from({ length: PAGEITEMNUM }, (_, i) => PAGEITEMNUM * pageIdx + i).map(categoryCode => (
                <CategoryItem
                  key={categoryCode}
                  categoryCode={categoryCode}
                  storeid={userVotes[categoryCode].storeid}
                />
              ))}
            </SlideContainer>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
};

export default SideBanner;
