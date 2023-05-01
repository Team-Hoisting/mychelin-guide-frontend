import React from 'react';
import styled from 'styled-components';
import { Divider } from '@mantine/core';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { CommentsTextArea, CommentsData } from './index';

import { commentQueryKey } from '../../constants/index';
import { fetchComments } from '../../api/comment';
import useCommentsMutation from '../../hooks/useCommentsMutation';
import CommentsButtons from './CommentsButtons';
import 'react-loading-skeleton/dist/skeleton.css';

const CommentsContainer = styled.div`
  font-size: 18px;
  width: 100%;
  min-width: 1000px;
  height: 700;
`;

const Label = styled.label`
  font-weight: 800;
`;

const Box = styled.div`
  height: 500px;
`;

const Loading = styled.div`
  height: 700;
`;

const Comments = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = React.useState(1);
  const { addComment, deleteComment } = useCommentsMutation({ id, currentPage });

  const { data, isLoading } = useQuery([...commentQueryKey, id, currentPage], fetchComments(id, currentPage), {
    keepPreviousData: true,
  });

  if (isLoading) return <Loading />;

  const { data: commentsData, totalPages } = data;

  return (
    <>
      <CommentsContainer className="comments-container">
        <Label>댓글</Label>
        <Divider my="sm" />
        <CommentsTextArea addComment={addComment} setCurrentPage={setCurrentPage} />
        <Box>
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
        </Box>
      </CommentsContainer>
    </>
  );
};

export default Comments;
