import React from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import styled from 'styled-components';
import { Divider } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { TbTriangleFilled, TbTriangleInvertedFilled } from 'react-icons/tb';

import { Loader } from './index';

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

  border-radius: 10px;
  text-align: center;
  z-index: 999;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  background-color: var(--bg-secondary-color);
  color: var(--font-color);
`;
const Title = styled.h4`
  margin: 8px auto;
  width: 60px;
  font-size: 15px;
  text-align: center;
`;

const SlideContainer = styled.div`
  padding: auto;
`;

const CarouselContainer = styled(Carousel)`
  margin: 5px;
`;

const SideBanner = () => {
  const user = useRecoilValue(userState);

  const { data: votedStoresInfo, isLoading } = useQuery({
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

  if (isLoading) return <Loader />;

  return (
    <Container>
      <Title>투표 현황</Title>
      <Divider size="sm" />
      <CarouselContainer
        slideSize="100%"
        height="380"
        align="center"
        orientation="vertical"
        slideGap="xs"
        controlsOffset="sm"
        controlSize={30}
        loop
        draggable={false}
        previousControlIcon={<TbTriangleFilled />}
        nextControlIcon={<TbTriangleInvertedFilled />}
        styles={{
          control: {
            color: 'var(--primary-color)',
            background: 'none',
            border: 'none',
          },
        }}>
        {Array.from({ length: categoryCodes.length / PAGEITEMNUM }, (_, i) => i).map(pageIdx => (
          <Carousel.Slide key={pageIdx} size="80%">
            <SlideContainer>
              {Array.from({ length: PAGEITEMNUM }, (_, i) => PAGEITEMNUM * pageIdx + i).map(categoryIdx => (
                <VotedCategoryItem
                  key={categoryCodes[categoryIdx]}
                  categoryCode={categoryCodes[categoryIdx]}
                  storeId={votedStoresInfo?.[categoryCodes[categoryIdx]]?.storeId}
                  storeImg={votedStoresInfo?.[categoryCodes[categoryIdx]]?.imgUrl}
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
