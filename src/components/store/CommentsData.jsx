import React from 'react';
import styled from 'styled-components';

import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Divider } from '@mantine/core';
import userState from '../../recoil/atoms/userState';
import { Button } from '../common/index';

const Comment = styled.div`
  position: relative;
  margin: 18px 0;
  padding: 4px 0;
  display: flex;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;

const Profile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 12px;
`;

const CloseBtn = styled(Button)`
  position: absolute;
  top: 2px;
  right: 0;
  width: 40px;
  height: 40px;
  font-size: 18px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  color: var(--font-color);
  font-weight: 500;
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
  margin: 0 4px;
`;

const CommentsData = ({ commentData, deleteComment, hasBorder }) => {
  const { nickname, isCertified, content, email, commentId } = commentData;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const handleCommentCloseBtnClick = commentId => () => {
    deleteComment(commentId);
  };

  const handleProfileClick = nickname => () => {
    navigate(`/profile/${nickname}`, { state: pathname });
  };

  return (
    <div>
      <Comment>
        <Profile src={`/img/users/${commentData?.nickname}`} onClick={handleProfileClick(nickname)} />
        <div>
          <User>
            <NickName>{nickname}</NickName>
            {isCertified && <CertifiedIcon />}
          </User>
          <CommentText>{content}</CommentText>
        </div>
        {user && email === user?.email && <CloseBtn onClick={handleCommentCloseBtnClick(commentId)}>X</CloseBtn>}
      </Comment>
      {hasBorder && <Divider />}
    </div>
  );
};

export default CommentsData;
