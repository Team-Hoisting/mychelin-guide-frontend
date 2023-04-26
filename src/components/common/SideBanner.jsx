import React from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import styled from 'styled-components';
import { Divider } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import voteQueryKey from '../../constants/voteQueryKey';
import { fetchVotedStoresByNickname } from '../../api/stores';

import userState from '../../recoil/atoms/userState';

import categoryCodes from '../../constants/categoryCodes';

import VotedCategoryItem from '../sidebanner/VotedCategoryItem';

const PAGEITEMNUM = 3;

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

  const { data: votedStoresInfo } = useQuery({
    queryKey: voteQueryKey,
    queryFn: fetchVotedStoresByNickname(user.nickname),
    select(voteInfos) {
      const votedStoresInfo = {};

      voteInfos.forEach(voteInfo => {
        votedStoresInfo[voteInfo.categoryCode] = voteInfo.store;
      });

      return votedStoresInfo;
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
                <VotedCategoryItem
                  key={categoryCodes[categoryIdx]}
                  categoryCode={categoryCodes[categoryIdx]}
                  storeImg={votedStoresInfo?.[categoryCodes[categoryIdx]].imgUrl}
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
