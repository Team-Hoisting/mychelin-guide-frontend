import React from 'react';
import styled from 'styled-components';
import { Divider } from '@mantine/core';

import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { Button, Loader } from '../common/index';
import { CommentsTextArea, CommentsData } from './index';
import userState from '../../recoil/atoms/userState';

import { commentQueryKey, COMMENTS_FETCH_SIZE } from '../../constants/index';
import { fetchComments } from '../../api/comment';
import useCommentsMutation from '../../hooks/useCommentsMutation';
import CommentsButtons from './CommentsButtons';
// import CommentsData from './CommentsData';

const CommentsContainer = styled.div`
  font-size: 18px;
  width: 100%;
  min-width: 1000px;
`;

const Label = styled.label`
  font-weight: 800;
`;

const LabelSkeleton = styled.div`
  width: 33px;
  height: 26px;
`;

const CommentsContainerSkeleton = styled.div`
  background-color: gray;
  width: 100%;
  min-width: 1000px;
  height: 660px;
`;

const Comments = () => {
  const { id } = useParams();
  // const { pathname } = useLocation();
  // const navigate = useNavigate();
  // const user = useRecoilValue(userState);
  const [currentPage, setCurrentPage] = React.useState(1);

  // comment만 리렌더되서 그런가 ? -> 데이터가 로딩되는 동안 컴포넌트가 렌더되지 않기 때문.
  // 로더로 변경하는 것도 고려해보기
  const { addComment, deleteComment } = useCommentsMutation({ id, currentPage });

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [...commentQueryKey, id, currentPage],
    queryFn: fetchComments(id, currentPage),
  });

  // if (isLoading) return <Loader />;

  if (isSuccess) {
    const { data: commentsData, totalPages } = data;
    console.log('comments: ', commentsData);
    return (
      <>
        <CommentsContainer className="comments-container">
          <Label>댓글</Label>
          <Divider my="sm" />
          <CommentsTextArea addComment={addComment} />
          {commentsData.map(commentData => (
            <CommentsData
              className="comments"
              key={commentData.commentId}
              commentData={commentData}
              deleteComment={deleteComment}
            />
          ))}
          <CommentsButtons
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            commentsData={commentsData}
            totalPages={totalPages}
          />
        </CommentsContainer>
      </>
    );
  }
};

export default Comments;
