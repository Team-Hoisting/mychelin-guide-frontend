import React from 'react';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { Divider } from '@mantine/core';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../common/index';
import userState from '../../recoil/atoms/userState';
import { commentQueryKey } from '../../constants/index';
import { fetchComment } from '../../api/comment';

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

const commentQuery = storeid => ({ queryKey: [...commentQueryKey, storeid], queryFn: fetchComment(storeid) });

const Comments = ({ addComment, deleteComment }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [user, setUser] = useRecoilState(userState);

  // ref로 ?
  const [content, setContent] = React.useState('');
  const { data: commentsData } = useQuery(commentQuery(id));

  const handleChange = e => {
    setContent(e.target.value);
  };

  const handleCommentBtnClick = () => {
    if (!content) return;
    // 로그인 안 된 상태면 login page로
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
    navigate(`/profile/:${nickname}`, { state: pathname });
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
      </CommentsContainer>
    </>
  );
};

export default Comments;
