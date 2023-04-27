import { useQuery } from '@tanstack/react-query';
import { fetchUserAllInfoByNickname } from '../api/users';
import userQueryKey from '../constants/userQueryKey';

const useUserProfile = nickname => {
  const { data, isLoading } = useQuery({
    queryKey: [...userQueryKey, nickname, 'all'],
    queryFn: fetchUserAllInfoByNickname(nickname),
    select(userInfo) {
      const { user, voteStores } = { ...userInfo };

      const sortedByVotedAt = [...voteStores].sort((a, b) => a.votedAt.valueOf() - b.votedAt.valueOf());

      const sortedVotedStores = user.votedCategoryOrder.reverse().reduce((result, categoryCode) => {
        const idx = result.findIndex(res => res.categoryCode === categoryCode);

        return [result[idx], ...result.slice(0, idx), ...result.slice(idx + 1)];
      }, sortedByVotedAt);

      return { ...userInfo, voteStores: sortedVotedStores };
    },
  });

  return { profileInfo: data, isLoading };
};

export default useUserProfile;
