import React from 'react';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';

import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userState from '../../recoil/atoms/userState';
import { Button } from '../common/index';

const Comment = styled.div`
  position: relative;
  margin: 18px 0;
  padding: 4px 0;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;

const Profile = styled.img`
  width: 36px;
  border-radius: 50%;
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
  margin: 0 4px;
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
          <Profile src={`/img/users/${commentData?.nickname}`} onClick={handleProfileClick(nickname)} />
          <NickName>{nickname}</NickName>
          {isCertified && <CertifiedIcon />}
        </User>
        <CommentText>{content}</CommentText>
        {user && email === user?.email && <CloseBtn onClick={handleCommentCloseBtnClick(commentId)}>X</CloseBtn>}
      </Comment>
    </div>
  );
};

export default CommentsData;
