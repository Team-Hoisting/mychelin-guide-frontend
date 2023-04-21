import React from 'react';
import styled from 'styled-components';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, SideBanner } from '../components/common/index';
import categoryCodes from '../constants/categoryCodes';
import categoryInfo from '../constants/categoryInfo';
import storeQueryKey from '../constants/storeQueryKey';

const Container = styled.div`
  width: 100%;
  padding: 12px 0;
  margin: 0 auto;
  font-size: 20px;
`;

const StoreDetailContainer = styled.div``;

const StoreTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  width: 90%;
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

const VoteButton = styled(Button)`
  background-color: var(--primary-color);
`;

const BookmarkIcon = styled(BsBookmark)`
  width: 40px;
`;

const Bookmark = styled.div`
  margin-right: 16px;
`;

const ImageContainer = styled.div`
  display: flex;
  height: 100%;
`;

const Map = styled.div`
  width: 30%;
  background-color: gray;
`;

const Image = styled.img.attrs({
  alt: 'store',
})`
  max-width: 60%;
  margin-right: 20px;
  border-radius: 4px;
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
  width: 80%;
  font-size: 16px;
  border-radius: 12px;
  border: 1px solid #ced4da;
  margin: 12px 0;
`;

const Comments = styled.div``;

const Comment = styled.div`
  width: 80%;
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
  top: 50px;
  right: 10px;
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

// storeID에 해당하는 vote 가져오기 -> category 별로 개수 반환
const voteCnt = { KO01: 112, CH02: 249, JP03: 29 };

// storeId에 해당하는 comment 필터
// 해당 comments data에서 email이 같은 해당하는 유저 정보 중 프로필 이미지, nickname, isCertified, comment 반환
const comments = [
  { commentid: 0, email: 'bin000527@naver.com', nickname: 'abc', isCertified: true, comment: '맛있엉요' },
  { commentid: 1, email: 'bin000527@naver.com', nickname: 'abc123', isCertified: true, comment: '맛있엉요 짱짱' },
  {
    commentid: 2,
    email: 'bin00052722@naver.com',
    nickname: 'abc12345',
    isCertified: true,
    comment: '맛있엉요 짜아ㅉ아',
  },
];

// 중앙 정렬 제대로 X
const StoreDetailPage = () => {
  // 로그인 된 유저
  const user = {
    email: 'bin000527@naver.com',
    password: '1234567',
    nickname: '웨스트달러예빈',
    myLink: '',
    isCertified: true,
    voteOrder: [],
  };

  const { id } = useParams();

  const {
    isLoading,
    isError,
    data: storeData,
  } = useQuery([...storeQueryKey, id], async () => {
    const res = await axios.get(`/api/stores/${id}`);
    return res.data;
  });

  if (isLoading) return <div>Loading..</div>;

  console.log('res: ', storeData);
  const { storeid, storeName, address, firstVoteUser, phoneNumber, voteCnt, archivedCnt, imgUrl } = storeData;

  return (
    <>
      <Container className="container">
        <StoreDetailContainer>
          <StoreTitleContainer>
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
                <span>{archivedCnt}</span>
              </Bookmark>
              <VoteButton>투표하기</VoteButton>
            </Side>
          </StoreTitleContainer>
          <FirstVoteUser>
            최초 투표자 : <UserName>{firstVoteUser}</UserName>
          </FirstVoteUser>
          <ImageContainer>
            <Image src={imgUrl} />
            <Map>지도 표시</Map>
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
        <CommentsContainer>
          <Label>댓글</Label>
          <TextArea></TextArea>
          <Comments>
            {comments.map(({ commentid, email, nickname, isCertified, comment }) => (
              <Comment key={commentid}>
                <User>
                  <Profile />
                  <NickName>{nickname}</NickName>
                  {isCertified && <CertifiedIcon />}
                </User>
                <CommentText>{comment}</CommentText>
                {email === user.email && <CloseBtn>X</CloseBtn>}
              </Comment>
            ))}
          </Comments>
        </CommentsContainer>
      </Container>
      {/* <SideBanner /> */}
    </>
  );
};

export default StoreDetailPage;
