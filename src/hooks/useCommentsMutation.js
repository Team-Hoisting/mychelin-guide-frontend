import React from 'react';
import axios from 'axios';
import useDataMutation from './useDataMutaiton';
import { commentQueryKey } from '../constants/index';

const url = `/api/comments`;

const useCommentsMutation = ({ id, currentPage }) => {
  const { mutate: addComment } = useDataMutation({
    mutationFn: newComment => axios.post(url, newComment),
    onMutate(newComment) {
      return comments => [newComment, ...comments.data];
    },
    queryKey: [...commentQueryKey, id, currentPage],
  });

  const { mutate: deleteComment } = useDataMutation({
    mutationFn: commentId => axios.delete(`${url}/${commentId}`),
    onMutate(id) {
      return comments => comments.data.filter(comment => comment.commentId !== id);
    },
    queryKey: [...commentQueryKey, id, currentPage],
  });

  return { addComment, deleteComment };
};

export default useCommentsMutation;
