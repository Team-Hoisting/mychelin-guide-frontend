import React from 'react';
import styled from 'styled-components';
import { Divider } from '@mantine/core';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommentsTextArea, CommentsData } from './index';

import { Loader } from '../common/index';
import { commentQueryKey } from '../../constants/index';
import { fetchComments } from '../../api/comment';
import useCommentsMutation from '../../hooks/useCommentsMutation';
import CommentsButtons from './CommentsButtons';

const CommentsContainer = styled.div`
  font-size: 18px;
  width: 100%;
  min-width: 1000px;
`;

const Label = styled.label`
  font-weight: 800;
`;

// eslint-disable-next-line consistent-return
const Comments = () => {
  const { id } = useParams();
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
    return (
      <>
        <CommentsContainer className="comments-container">
          <Label>댓글</Label>
          <Divider my="sm" />
          <CommentsTextArea addComment={addComment} />
          {commentsData?.map(commentData => (
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
