import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { commentQueryKey } from '../constants/index';

const pageSize = 5;

const useCommentsQuery = ({ id }) => {
  const fetchComments = async pageParam => {
    const url = `/api/comments/${id}?page=${pageParam}&pageSize=${pageSize}`;

    const { data } = await axios.get(url);

    return data;
  };

  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery(
    [...commentQueryKey, id],
    ({ pageParam = 1 }) => fetchComments(pageParam)
    // {
    //   getNextPageParam: (lastPage, allPages) => {
    //     const nextPage = allPages.length + 1;

    //     return lastPage.length !== 0 && nextPage;
    //   },
    // }
  );

  return { data, hasNextPage, fetchNextPage, isLoading };
};

export default useCommentsQuery;
