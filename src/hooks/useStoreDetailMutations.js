import React from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import useDataMutation from './useDataMutaiton';
import userState from '../recoil/atoms/userState';
import { commentQueryKey, archiveQueryKey } from '../constants/index';

const url = `/api/comments`;
const archiveURL = '/api/archives';

const useStoreDetailMutations = ({ id, setArchiveCntState }) => {
  const [user, setUser] = useRecoilState(userState);

  const { mutate: addComment } = useDataMutation({
    mutationFn: newComment => axios.post(url, newComment),
    onMutate(newComment) {
      return comments => [newComment, ...comments.data];
    },
    queryKey: [...commentQueryKey, id],
  });

  const { mutate: deleteComment } = useDataMutation({
    mutationFn: commentId => axios.delete(`${url}/${commentId}`),
    onMutate(id) {
      return comments => {
        console.log(
          'in delete mutation: ',
          comments.data.filter(comment => comment.commentId !== id)
        );
        return comments.data.filter(comment => comment.commentId !== id);
      };
    },
    queryKey: [...commentQueryKey, id],
  });

  const { mutate: addBookMark } = useDataMutation({
    mutationFn: newBookMark => axios.post(`${archiveURL}/archive`, newBookMark),
    onMutate(newBookMark) {
      return () => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const newUser = { ...user, archived: [...user?.archived, newBookMark] };
        setUser(newUser);
        setArchiveCntState(prev => prev + 1);
        return newUser;
      };
    },
    queryKey: [...archiveQueryKey, id, user?.email],
  });

  const { mutate: deleteBookMark } = useDataMutation({
    mutationFn: bookMarkToDelete => axios.post(`${archiveURL}/unarchive`, bookMarkToDelete),
    onMutate(bookMarkToDelete) {
      return () => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const [{ seq: deleteSeq }] = user?.archived.filter(
          arc => arc.storeId === bookMarkToDelete.storeId && arc.email === user?.email
        );
        const newUserData = { ...user, archived: user?.archived?.filter(arc => arc.seq !== deleteSeq) };
        setUser(newUserData);
        setArchiveCntState(prev => prev - 1);

        return newUserData;
      };
    },
    queryKey: [...archiveQueryKey, id, user?.email],
  });

  return { addComment, deleteComment, addBookMark, deleteBookMark };
};

export default useStoreDetailMutations;
