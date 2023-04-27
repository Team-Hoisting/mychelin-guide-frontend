import { useQuery } from '@tanstack/react-query';
import { fetchUserAllInfoByNickname } from '../api/users';
import userQueryKey from '../constants/userQueryKey';

const useUserProfile = nickname => {
  const { data } = useQuery({
    queryKey: [...userQueryKey, 'all', nickname],
    queryFn: fetchUserAllInfoByNickname(nickname),
    select(userInfo) {
      const { user, voteStores } = { ...userInfo };

      const sortedByVotedAt = [...voteStores].sort((a, b) => a.votedAt.valueOf() - b.votedAt.valueOf());

      const sortedVotedStores = user.votedCategoryOrder.reduce((result, categoryCode) => {
        const idx = result.findIndex(res => res.categoryCode === categoryCode);

        return [result[idx], ...result.slice(0, idx), ...result.slice(idx + 1)];
      }, sortedByVotedAt);

      return { ...userInfo, voteStores: sortedVotedStores };
    },
  });

  return data;
};

export default useUserProfile;
