import React from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import useDataMutation from './useDataMutaiton';
import userState from '../recoil/atoms/userState';
import { archiveQueryKey } from '../constants/index';

const archiveURL = '/api/archives';

const useArchivesMutation = ({ id, setArchiveCntState }) => {
  const [user, setUser] = useRecoilState(userState);

  const { mutate: addBookMark } = useDataMutation({
    mutationFn: newBookMark => axios.post(`${archiveURL}`, newBookMark),
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
    mutationFn: bookMarkToDelete => axios.delete(`${archiveURL}`, bookMarkToDelete),
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

  return { addBookMark, deleteBookMark };
};

export default useArchivesMutation;
