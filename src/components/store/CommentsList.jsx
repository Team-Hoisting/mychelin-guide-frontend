import React from 'react';
import styled from 'styled-components';
import { Divider } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CommentsTextArea, Comment, Pagination } from './index';
import { COMMENTS_FETCH_SIZE } from '../../constants/index';
import { useCommentsMutation, useComments } from '../../hooks/index';

const CommentsContainer = styled.div`
  font-size: 18px;
  width: 100%;
  min-width: 1000px;
  height: 800px;
`;

const Label = styled.label`
  font-weight: 800;
`;

const CommentsList = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = React.useState(1);
  const { addComment, deleteComment } = useCommentsMutation({ id, currentPage });

  const { data } = useComments({ storeId: id, currentPage });
  const { data: commentsData, totalPages } = data;

  return (
    <CommentsContainer className="comments-container">
      <Label>댓글</Label>
      <Divider my="sm" />
      <CommentsTextArea addComment={addComment} setCurrentPage={setCurrentPage} />
      {commentsData?.map((commentData, idx) => (
        <Comment
          className="comments"
          key={commentData.commentId}
          commentData={commentData}
          deleteComment={deleteComment}
          hasBorder={idx !== COMMENTS_FETCH_SIZE - 1}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        commentsData={commentsData}
        totalPages={totalPages}
      />
    </CommentsContainer>
  );
};

export default CommentsList;
