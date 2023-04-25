import { useRecoilValue } from 'recoil';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { categoryState } from '../recoil/atoms';
import { storesQueryKey, STORES_FETCH_SIZE } from '../constants';

const useFetchStores = () => {
  const category = useRecoilValue(categoryState);

  const fetchStores = async page => {
    // prettier-ignore
    const response = await axios.get(`/api/stores?category=${category === 'AL00' ? '' : category}&page=${page}&page_size=${STORES_FETCH_SIZE}`);

    return response.data;
  };

  // prettier-ignore
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [...storesQueryKey, category], 
    queryFn: ({ pageParam = 1 }) => fetchStores(pageParam),
    getNextPageParam: (lastPage, allPages) =>
    lastPage.length === STORES_FETCH_SIZE ? allPages.length + 1 : undefined,
  });

  return { data, isLoading, fetchNextPage, hasNextPage };
};

export default useFetchStores;
