import React from 'react';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';

import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Skeleton from 'react-loading-skeleton';
import { Button } from '../common/index';
import userState from '../../recoil/atoms/userState';

const Comment = styled.div`
  position: relative;
  margin: 18px 0;
  padding: 4px 0;
  border: 2px dashed salmon;
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

const CommentsData = ({ commentData, deleteComment }) => {
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
        <User>
          {nickname ? (
            <Profile onClick={handleProfileClick(nickname)} />
          ) : (
            <Skeleton circle={true} height={50} width={50} className="profileskeleton" />
          )}
          <NickName>{nickname || <Skeleton />}</NickName>
          {isCertified ? <CertifiedIcon /> : <Skeleton circle={true} height={50} width={50} />}
        </User>
        <CommentText>{content}</CommentText>
        {!user ? (
          <Skeleton height={32} width={32} />
        ) : email === user?.email ? (
          <CloseBtn onClick={handleCommentCloseBtnClick(commentId)}>X</CloseBtn>
        ) : undefined}
      </Comment>
    </div>
  );
};

export default CommentsData;
