import React from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import styled from 'styled-components';
import { Divider } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import voteQueryKey from '../../constants/voteQueryKey';
import { fetchVotesByNickname } from '../../api/votes';
import { fetchStore } from '../../api/stores';

import userState from '../../recoil/atoms/userState';

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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

const StoreImg = styled.img`
  margin: auto;
  width: 100%;
  height: 100%;
  color: black;
`;

const CategoryName = styled.p`
  font-size: 13px;
`;

const CategoryItem = ({ categoryCode, storeId }) => {
  const [imgSrc, setImgSrc] = React.useState(`/categoryIcons/noColor/${categoryInfo[categoryCode].imgFile}.png`);

  const getImgUrl = async () => {
    const { imgUrl } = await fetchStore(storeId)();

    setImgSrc(imgUrl);
  };

  if (storeId) {
    getImgUrl();
  }

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
  margin: 0;
  padding: 5px;
  top: 200px;
  right: 50px;
  width: 100px;
  height: fit-content;
  border: 1px solid #d21312;
  border-radius: 10px;
  text-align: center;
  background-color: white;
  z-index: 999;
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
  const user = useRecoilValue(userState);

  const { data: userVoteObj } = useQuery({
    queryKey: voteQueryKey,
    queryFn: fetchVotesByNickname(user.nickname),
    select(userVotes) {
      const userVote = {};

      userVotes.forEach(vote => {
        userVote[vote.categoryCode] = vote.storeId;
      });

      return userVote;
    },
  });

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
                  storeId={userVoteObj?.[categoryCodes[categoryIdx]]}
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
