import React from 'react';
import styled from 'styled-components';
import { Carousel } from '@mantine/carousel';
import { categoryCodes, categoryInfo } from '../../constants';

const Container = styled.div`
  padding: 2rem 1.2rem;
`;

const Info = styled.div`
  margin-bottom: 3rem;
`;

const Store = styled.h2`
  margin-bottom: 0.4rem;
`;

const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ShortenedCarousel = styled(Carousel)`
  width: 300px;
`;

const Slide = styled(Carousel.Slide)`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 40px;
  }

  .text {
    margin-left: 1rem;
    font-size: 1.7rem;
    font-weight: 600;
  }
`;

const Vote = () => {
  console.log();

  return (
    <Container>
      <Info>
        <Store>오므토토마토 강남본점</Store>
        <span className="address">서울 강남구 테헤란로4길 29 1층 오므토토마토 강남본점</span>
      </Info>
      <CarouselContainer>
        <ShortenedCarousel
          slideSize="30%"
          height={200}
          slideGap="xs"
          controlsOffset="xl"
          controlSize={40}
          slidesToScroll={1}
          loop>
          {categoryCodes.map(code => (
            <Slide key={code} size="50%">
              <img src={`/categoryIcons/${categoryInfo[code].imgFile}.png`} alt={code} />
              <span className="text">{categoryInfo[code].ko}</span>
            </Slide>
          ))}
        </ShortenedCarousel>
      </CarouselContainer>
    </Container>
  );
};

export default Vote;
