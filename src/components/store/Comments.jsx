import React from 'react';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { Divider } from '@mantine/core';

import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { Button, Loader } from '../common/index';
import userState from '../../recoil/atoms/userState';

import { commentQueryKey, COMMENTS_FETCH_SIZE } from '../../constants/index';
import { fetchComments } from '../../api/comment';

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

  margin: 12px 0;
  resize: none;
  background-color: var(--bg-dark-color);
  color: var(--font-color);
  border: 2px solid var(--border-primary);

  :focus {
    border: 2px solid var(--border-primary);
    outline: none;
  }
`;

const CommentBtn = styled(Button)`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const Comment = styled.div`
  position: relative;
  margin: 18px 0;
  padding: 4px 0;
  border: 2px soild white;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;

const Profile = styled(CgProfile)`
  width: 36px;
  cursor: pointer;
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

const ButtonContainer = styled.div`
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 30%;
  justify-content: flex-start;
  margin: 0 auto;
`;

const PageButton = styled(Button)`
  width: cal(100%/)
  height: 40px;
  display: flex;

  align-items: center;
  justify-content: center;
 
  font-size: 17px;
  background: ${({ clicked }) => (clicked ? 'var(--button-hover-color);' : 'none;')}
  color: var(--font-color);
  flex-wrap: nowrap;

  :hover {
    background: var(--border-primary);
  }
`;

const PrevButton = styled(PageButton)`
  width: 40px;
  margin: 0 10px;
  padding: 0 4px;
`;

const NextButton = styled(PageButton)`
  width: 40px;
  margin: 0 4px;
  padding: 0 4px;
`;

const Comments = ({ addComment, deleteComment }) => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [content, setContent] = React.useState('');

  const commentQuery = storeid => ({
    queryKey: [...commentQueryKey, storeid, currentPage],
    queryFn: fetchComments(id, currentPage),
  });

  const { data, isLoading } = useQuery(commentQuery(id));

  if (isLoading) return <Loader />;

  const { data: commentsData, totalPages } = data;

  const startIndex = (page - 1) * COMMENTS_FETCH_SIZE; // 0
  const endIndex = startIndex + +COMMENTS_FETCH_SIZE; // 5

  const currentPages = Array.from(
    { length: totalPages < 5 ? totalPages : endIndex - startIndex },
    (_, i) => startIndex + 1 + i
  );

  const handleChange = e => {
    setContent(e.target.value);
  };

  const handleCommentBtnClick = () => {
    if (!content) return;

    if (!user) {
      navigate('/signin', { state: pathname });
      return;
    }

    addComment({
      storeId: id,
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

  const handleProfileClick = nickname => () => {
    navigate(`/profile/${nickname}`, { state: pathname });
  };

  const handlePageBtnClick = page => () => {
    setCurrentPage(page);
  };

  const handlePrevBtnClick = () => {
    setPage(page - 1);

    setCurrentPage(startIndex);
  };

  const handleNextBtnClick = () => {
    setPage(page + 1);
    setCurrentPage(endIndex + 1);
  };

  return (
    <>
      <CommentsContainer className="comments-container">
        <Label>댓글</Label>
        <Divider my="sm" />
        <CommentPostContainer>
          <TextArea onChange={handleChange} content={content}></TextArea>
          <CommentBtn onClick={handleCommentBtnClick}>등록하기</CommentBtn>
        </CommentPostContainer>
        <div>
          {commentsData?.map(({ commentId, email, nickname, isCertified, content }) => (
            <Comment key={commentId}>
              <User>
                <Profile onClick={handleProfileClick(nickname)} />
                <NickName>{nickname}</NickName>
                {isCertified && <CertifiedIcon />}
              </User>
              <CommentText>{content}</CommentText>
              {user && email === user?.email && <CloseBtn onClick={handleCommentCloseBtnClick(commentId)}>X</CloseBtn>}
            </Comment>
          ))}
        </div>
        <ButtonContainer className="container">
          <ButtonGroup className="buttoncontainer">
            {commentsData.length > 0 && page !== 1 && <PrevButton onClick={handlePrevBtnClick}>Prev</PrevButton>}
            {currentPages.map(
              pageNum =>
                pageNum <= totalPages && (
                  <PageButton key={pageNum} onClick={handlePageBtnClick(pageNum)} clicked={pageNum === currentPage}>
                    {pageNum}
                  </PageButton>
                )
            )}
            {commentsData.length > 0 && page !== Math.ceil(totalPages / COMMENTS_FETCH_SIZE) && (
              <NextButton onClick={handleNextBtnClick}>Next</NextButton>
            )}
          </ButtonGroup>
        </ButtonContainer>
      </CommentsContainer>
    </>
  );
};

export default Comments;
