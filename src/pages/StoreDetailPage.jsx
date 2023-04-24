import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { useLoaderData } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { Divider } from '@mantine/core';
import userState from '../recoil/atoms/userState';
import { Button, SideBanner } from '../components/common/index';

import categoryCodes from '../constants/categoryCodes';
import categoryInfo from '../constants/categoryInfo';
import storeQueryKey from '../constants/storeQueryKey';
import commentQueryKey from '../constants/commentQueryKey';

import { fetchStore } from '../api/stores';
import fetchComment from '../api/comment';

import Vote from '../components/modal/Vote';

const Container = styled.div`
  width: 100%;
  padding: 12px 0;
  margin: 0 auto;
  font-size: 20px;
`;

const StoreDetailContainer = styled.div`
  width: 100%;
  min-width: 1000px;
`;

const StoreTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
`;

const StoreTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  margin-right: 12px;
`;

const Star = styled.img.attrs({
  src: '/images/fork-spoon.png',
})`
  width: 36px;
  height: 36px;
  display: block;
`;

const StarContainer = styled.div`
  display: flex;
`;

const FirstVoteUser = styled.div`
  font-size: 18px;
  margin: 4px 0;
`;

const UserName = styled.span`
  font-weight: 700;
`;

const Side = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const VoteBtn = styled(Button)`
  background-color: var(--primary-color);
`;

const BookmarkIcon = styled(BsBookmark)`
  width: 40px;
`;

const Bookmark = styled.div`
  margin: 0 20px;
  position: relative;
`;

const ArchivedCnt = styled.span`
  position: absolute;
  top: -1.5px;
  left: 36px;
`;

const ImageContainer = styled.div`
  display: flex;
  height: 500px;
  min-width: 1000px;
`;

const DetailContainer = styled.div`
  width: 37%;
  position: relative;
  background-color: lightgray;
  border-radius: 4px;
`;

const Map = styled.div`
  background-color: gray;
  position: absolute;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 76%;
  border-radius: 4px;
`;

const DetailTextContainer = styled.div`
  position: absolute;
  border: 1px solid black;
  top: 82%;
  left: 50%;
  width: 90%;
  transform: translateX(-50%);
  font-size: 14px;
  padding: 5px;
  border-radius: 4px;
`;

const Address = styled.div`
  padding: 4px 0;
`;

const Phone = styled.div`
  padding: 4px 0;
`;

const AddressTitle = styled.span`
  font-weight: 700;
`;

const PhoneTitle = styled.span`
  font-weight: 700;
`;

const loading = keyframes`
  0% {
    transform: translateX(0);
  }

  50%,
  100% {
    transform: translateX(100%);
  }
`;

const ImageSkeleton = styled.div`
  width: 70%;
  height: 500px;
  margin-right: 24px;
  overflow: hidden;
  position: relative;
  background-color: #f2f2f2;

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ccc, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  }
`;

const Image = styled.img.attrs({
  alt: 'store',
})`
  display: ${({ isImgLoading }) => (isImgLoading ? 'none' : 'block')};
  width: 70%;
  height: 500px;
  margin-right: 24px;
  border-radius: 4px;
  object-fit: cover;
`;

const VoteCategories = styled.div`
  display: flex;
  max-width: 360px;
  align-items: center;
  padding: 10px 0;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0;
  margin-right: 12px;
  padding: 4px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const CategoryIcon = styled.img.attrs(({ ctg }) => ({
  alt: 'category',
  src: `/categoryIcons/${categoryInfo[ctg].imgFile}.png`,
}))`
  width: 32px;
  margin: 4px;
`;

const CategoryText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const CommentsContainer = styled.div`
  font-size: 18px;
  width: 100%;
  min-width: 1000px;
`;

const CommentPostContainer = styled.div`
  position: relative;
`;

const Label = styled.label`
  font-weight: 800;
`;

const TextArea = styled.textarea.attrs(({ comment }) => ({
  rows: 3,
  placeholder: '이 식당 어떠셨나요? 솔직한 후기를 알려주세요.',
  value: comment,
}))`
  display: block;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  border-radius: 12px;
  border: 1px solid #ced4da;
  margin: 12px 0;
`;

const CommentBtn = styled(Button)`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const Comments = styled.div``;

const Comment = styled.div`
  position: relative;
  margin: 18px 0;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;

const Profile = styled(CgProfile)`
  width: 36px;
`;

const CloseBtn = styled(Button)`
  position: absolute;
  top: 2px;
  right: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentText = styled.p`
  padding: 0 8px;
  margin: 4px 0;
`;

const CertifiedIcon = styled.img.attrs({
  src: '/images/certified.png',
})`
  width: 20px;
  margin: 4px;
`;

const NickName = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const Center = styled.div`
  width: 80%;
  margin: 0 auto;
`;
// 26571895

/**
 * TODO
 * //1. 중앙 정렬
 * //2. 로그인 된 유저 가져오기(recoilValue)
 * //3. 로더 변경
 * // 4. skeleton -> 이미지가 가장 마지막에 로드되는 문제
 * 5. 투표하기, 저장, 댓글 작성
 * 6. 컴포넌트 분리
 * //7. 비동기 함수 분리 -> /api/
 * 8. 사진 비율 1,2번이 다르게 그려짐.
 * //9. loader에서 data 불러오기
 * 10. star 받아와서 그리기
 */

const storeQuery = storeid => ({ queryKey: [...storeQueryKey, storeid], queryFn: fetchStore(storeid) });
const commentQuery = storeid => ({ queryKey: [...commentQueryKey, storeid], queryFn: fetchComment(storeid) });

const storeDetailLoader =
  queryClient =>
  async ({ params }) => {
    const store = storeQuery(params.id);
    const comment = commentQuery(params.id);

    // eslint-disable-next-line no-return-await
    const storeData = queryClient.getQueryData(store.queryKey) ?? (await queryClient.fetchQuery(store));
    const commentsData = queryClient.getQueryData(comment.queryKey) ?? (await queryClient.fetchQuery(comment));

    return { storeData, commentsData };
  };

const StoreDetailPage = () => {
  const [isImgLoading, setisImgLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textAreaRef = useRef(null);
  const user = useRecoilValue(userState);

  const {
    storeData: { storeName, address, firstVoteUser, phoneNumber, voteCnt, archivedCnt, imgUrl },
    commentsData,
  } = useLoaderData();

  const handleLoad = () => {
    setisImgLoading(false);
  };

  const handleModalClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Container className="container">
        <Center className="center">
          <StoreDetailContainer className="storedeail">
            <StoreTitleContainer className="storetitle">
              <StoreTitle>
                <Title>{storeName}</Title>
                <StarContainer>
                  <Star />
                  <Star />
                  <Star />
                </StarContainer>
              </StoreTitle>
              <Side>
                <Bookmark>
                  <BookmarkIcon />
                  <ArchivedCnt>{archivedCnt}</ArchivedCnt>
                </Bookmark>
                <VoteBtn onClick={handleModalClick}>투표하기</VoteBtn>
              </Side>
            </StoreTitleContainer>
            <FirstVoteUser>
              최초 투표자 : <UserName>{firstVoteUser}</UserName>
            </FirstVoteUser>
            <ImageContainer className="imagecontainer">
              {isImgLoading && <ImageSkeleton />}
              <Image src={imgUrl} onLoad={handleLoad} isImgLoading={isImgLoading} />

              <DetailContainer>
                <Map>지도 표시</Map>
                <DetailTextContainer>
                  <Address>
                    <AddressTitle>주소</AddressTitle>: {address}
                  </Address>
                  <Phone>
                    <PhoneTitle>전화번호</PhoneTitle>: {phoneNumber}
                  </Phone>
                </DetailTextContainer>
              </DetailContainer>
            </ImageContainer>
            <VoteCategories>
              {categoryCodes.map(
                ctg =>
                  voteCnt[ctg] && (
                    <Category key={ctg}>
                      <CategoryIcon ctg={ctg} />
                      <CategoryText>{categoryInfo[ctg].ko}</CategoryText>
                      <CategoryText>{voteCnt[ctg]}</CategoryText>
                    </Category>
                  )
              )}
            </VoteCategories>
          </StoreDetailContainer>
          <CommentsContainer className="comments-container">
            <Label>댓글</Label>
            <Divider my="sm" />
            <CommentPostContainer>
              <TextArea ref={textAreaRef}></TextArea>
              <CommentBtn>등록하기</CommentBtn>
            </CommentPostContainer>
            <Comments>
              {commentsData.map(({ commentid, email, nickname, isCertified, comment }) => (
                <Comment key={commentid}>
                  <User>
                    <Profile />
                    <NickName>{nickname}</NickName>
                    {isCertified && <CertifiedIcon />}
                  </User>
                  <CommentText>{comment}</CommentText>
                  {user && email === user.email && <CloseBtn>X</CloseBtn>}
                </Comment>
              ))}
            </Comments>
          </CommentsContainer>
        </Center>
      </Container>
      <SideBanner />
      {isModalOpen && <Vote onClose={() => setIsModalOpen(false)} />}
    </>
  );
};
export { storeDetailLoader };
export default StoreDetailPage;
