import React from 'react';
import styled from 'styled-components';
import { Divider } from '@mantine/core';

import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CgProfile } from 'react-icons/cg';
import { useRecoilValue } from 'recoil';
import { Button, Loader } from '../common/index';

import { CommentsTextArea, CommentsData } from './index';

import { commentQueryKey } from '../../constants/index';
import { fetchComments } from '../../api/comment';
import useCommentsMutation from '../../hooks/useCommentsMutation';
import CommentsButtons from './CommentsButtons';

import userState from '../../recoil/atoms/userState';

const CommentsContainer = styled.div`
  font-size: 18px;
  width: 100%;
  min-width: 1000px;
  height: 700;
  /* height: 100vh; */
`;

const Label = styled.label`
  font-weight: 800;
`;

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

const Box = styled.div`
  height: 500px;
`;

const Loading = styled.div`
  height: 700;
`;

// eslint-disable-next-line consistent-return
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
