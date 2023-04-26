import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { Divider } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import userState from '../recoil/atoms/userState';
import { Button } from '../components/common/index';

import { categoryCodes, categoryInfo, storeQueryKey, commentQueryKey } from '../constants/index';

import { fetchStore } from '../api/stores';
import { fetchComment } from '../api/comment';

import { StorePositionMap, Title, DetailSide } from '../components/store/index';
import useStoreDetailMutations from '../hooks/useStoreDetailMutations';

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

const FirstVoteUser = styled.div`
  font-size: 18px;
  margin: 4px 0;
`;

const UserName = styled.span`
  font-weight: 700;
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
// 로그인 안되어있으면 댓글 추가 안 되게

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
  const [content, setContent] = useState('');
  const [archivedCntState, setArchiveCntState] = React.useState(0);

  const [user, setUser] = useRecoilState(userState);
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data: storeData } = useQuery(storeQuery(id));
  const { data: commentsData } = useQuery(commentQuery(id));

  console.log('commentD: ', commentsData);

  const { addComment, deleteComment, addBookMark, deleteBookMark } = useStoreDetailMutations({
    id,
    setArchiveCntState,
  });

  useEffect(() => {
    setArchiveCntState(storeData.archivedCnt);
  }, []);

  const handleChange = e => {
    setContent(e.target.value);
  };

  const redirectToLogIn = () => {
    navigate('/signin', { state: pathname });
  };

  const handleCommentBtnClick = () => {
    // 로그인 안 된 상태면 login page로
    if (!user) {
      redirectToLogIn();
      return;
    }
    addComment({
      storeId,
      content,
      email: user?.email,
      isCertified: true,
      nickname: user?.nickname,
    });

    setContent('');
  };

  const handleCommentCloseBtnClick = commentId => () => {
    deleteComment(commentId);
  };

  // const { storeId, storeName, address, firstVoteUser, phoneNumber, voteCnt, archivedCnt, imgUrl, x, y } = storeData;

  return (
    <>
      <Container className="container">
        <Center className="center">
          <StoreDetailContainer className="storedetail">
            <Title
              storeId={storeData.storeId}
              storeName={storeData.storeName}
              addBookMark={addBookMark}
              deleteBookMark={deleteBookMark}
              archivedCntState={archivedCntState}
            />
            <FirstVoteUser>
              최초 투표자 : <UserName>{firstVoteUser}</UserName>
            </FirstVoteUser>
            <DetailSide store={storeData} />
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
              <CommentBtn onClick={handleCommentBtnClick}>등록하기</CommentBtn>
            </CommentPostContainer>
            <Comments>
              {commentsData?.map(({ commentId, email, nickname, isCertified, content }) => (
                <Comment key={commentId}>
                  <User>
                    <Profile />
                    <NickName>{nickname}</NickName>
                    {isCertified && <CertifiedIcon />}
                  </User>
                  <CommentText>{content}</CommentText>
                  {user && email === user?.email && (
                    <CloseBtn onClick={handleCommentCloseBtnClick(commentId)}>X</CloseBtn>
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
