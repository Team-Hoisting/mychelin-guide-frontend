import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useRecoilState } from 'recoil';
import { Divider } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import userState from '../recoil/atoms/userState';
import { Button, Modal } from '../components/common/index';

import categoryCodes from '../constants/categoryCodes';
import categoryInfo from '../constants/categoryInfo';
import storeQueryKey from '../constants/storeQueryKey';
import commentQueryKey from '../constants/commentQueryKey';
import archiveQueryKey from '../constants/archiveQueryKey';

import { fetchStore } from '../api/stores';
import { fetchComment } from '../api/comment';

import useDataMutation from '../hooks/useDataMutaiton';
import StorePositionMap from '../components/store/StorePositionMap';

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

const EmtpyBookmarkIcon = styled(BsBookmark)`
  width: 40px;
  cursor: pointer;
`;

const FillBookMarkIcon = styled(BsFillBookmarkFill)`
  width: 40px;
  cursor: pointer;
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
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 4px;
`;

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  border-radius: 4px;
`;

const DetailTextContainer = styled.div`
  position: absolute;
  top: 83%;
  left: 0;
  width: 100%;
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

const TextArea = styled.textarea.attrs(({ content }) => ({
  rows: 3,
  placeholder: '이 식당 어떠셨나요? 솔직한 후기를 알려주세요.',
  value: content,
}))`
  display: block;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  border-radius: 12px;
  border: 1px solid #ced4da;
  margin: 12px 0;
  resize: none;
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
 * //4. skeleton -> 이미지가 가장 마지막에 로드되는 문제
 * 5. 투표하기, 저장, 댓글 작성
 * 6. 컴포넌트 분리
 * //7. 비동기 함수 분리 -> /api/
 * //8. 사진 비율 1,2번이 다르게 그려짐.
 * //9. loader에서 data 불러오기
 * 10. star 받아와서 그리기
 * 11. user 관련 업데이트 안됨
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
  const { id } = useParams();

  const { data: storeData } = useQuery(storeQuery(id));
  const { data: commentsData } = useQuery(commentQuery(id));

  const [archivedCntState, setArchiveCntState] = React.useState(0);

  useEffect(() => {
    setArchiveCntState(storeData.archivedCnt);
  }, []);

  const [isImgLoading, setisImgLoading] = React.useState(true);
  const [content, setContent] = useState('');
  const [user, setUser] = useRecoilState(userState);

  const handleLoad = () => {
    setisImgLoading(false);
  };

  const handleChange = e => {
    setContent(e.target.value);
  };

  const url = `/api/comments`;
  // 아예 없는 경우 추가 자동으로 안됨
  const { mutate: addComment } = useDataMutation({
    mutationFn: newComment => axios.post(url, newComment),
    onMutate(newComment) {
      return comments => [newComment, ...comments];
    },
    queryKey: [...commentQueryKey, id],
  });

  const { mutate: deleteComment } = useDataMutation({
    mutationFn: commentId => axios.delete(`${url}/${commentId}`),
    onMutate(id) {
      return comments => comments.filter(comment => comment.commentId !== id);
    },
    queryKey: [...commentQueryKey, id],
  });

  const archiveURL = '/api/archives';

  const { mutate: addBookMark } = useDataMutation({
    mutationFn: newBookMark => axios.post(`${archiveURL}/archive`, newBookMark),
    onMutate(newBookMark) {
      return () => {
        const newUser = { ...user, archived: [...user.archived, newBookMark] };
        setUser(newUser);
        setArchiveCntState(prev => prev + 1);
        return newUser;
      };
    },
    queryKey: [...archiveQueryKey, id, user.email],
  });

  const { mutate: deleteBookMark } = useDataMutation({
    mutationFn: bookMarkToDelete => axios.post(`${archiveURL}/unarchive`, bookMarkToDelete),
    onMutate(bookMarkToDelete) {
      return () => {
        const [{ seq: deleteSeq }] = user.archived.filter(
          arc => arc.storeId === bookMarkToDelete.storeId && arc.email === user.email
        );
        const newUserData = { ...user, archived: user?.archived?.filter(arc => arc.seq !== deleteSeq) };
        setUser(newUserData);
        setArchiveCntState(prev => prev - 1);

        return newUserData;
      };
    },
    queryKey: [...archiveQueryKey, id, user.email],
  });

  const { storeId, storeName, address, firstVoteUser, phoneNumber, voteCnt, imgUrl, x, y } = storeData;

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
                  {user?.archived?.map(arc => arc.storeId).includes(id) ? (
                    <FillBookMarkIcon
                      onClick={() => {
                        deleteBookMark({ email: user.email, storeId: id });
                      }}
                    />
                  ) : (
                    <EmtpyBookmarkIcon
                      onClick={() => {
                        addBookMark({ storeId, email: user.email });
                      }}
                    />
                  )}
                  <ArchivedCnt>{archivedCntState}</ArchivedCnt>
                </Bookmark>
                <Modal storeId={storeId} width="120px" />
              </Side>
            </StoreTitleContainer>
            <FirstVoteUser>
              최초 투표자 : <UserName>{firstVoteUser}</UserName>
            </FirstVoteUser>
            <ImageContainer className="imagecontainer">
              {isImgLoading && <ImageSkeleton />}
              <Image src={imgUrl} onLoad={handleLoad} isImgLoading={isImgLoading} />

              <DetailContainer className="detail-container">
                <Map className="map">
                  <StorePositionMap x={x} y={y} />
                </Map>
                <DetailTextContainer>
                  <Address>
                    <AddressTitle>주소</AddressTitle>: {address}
                  </Address>
                  <Phone>
                    <PhoneTitle>전화번호</PhoneTitle>: {phoneNumber || '없음'}
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
              <TextArea onChange={handleChange} content={content}></TextArea>
              <CommentBtn
                onClick={() => {
                  addComment({
                    storeId,
                    content,
                    email: user.email,
                    isCertified: true,
                    nickname: user.nickname,
                  });
                  setContent('');
                }}>
                등록하기
              </CommentBtn>
            </CommentPostContainer>
            <Comments>
              {commentsData.map(({ commentId, email, nickname, isCertified, content }) => (
                <Comment key={commentId}>
                  <User>
                    <Profile />
                    <NickName>{nickname}</NickName>
                    {isCertified && <CertifiedIcon />}
                  </User>
                  <CommentText>{content}</CommentText>
                  {user && email === user.email && (
                    <CloseBtn
                      onClick={() => {
                        deleteComment(commentId);
                      }}>
                      X
                    </CloseBtn>
                  )}
                </Comment>
              ))}
            </Comments>
          </CommentsContainer>
        </Center>
      </Container>
    </>
  );
};
export { storeDetailLoader };
export default StoreDetailPage;
