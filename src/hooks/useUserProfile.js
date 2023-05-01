import { useQuery } from '@tanstack/react-query';
import { fetchUserProfileInfoByNickname } from '../api/users';
import userQueryKey from '../constants/userQueryKey';
import categoryCodes from '../constants/categoryCodes';

const useUserProfile = nickname => {
  const { data } = useQuery({
    queryKey: [...userQueryKey, nickname, 'profile'],
    queryFn: fetchUserProfileInfoByNickname(nickname),
    select(userInfo) {
      const { user, voteStores } = { ...userInfo };

      // const sortedByVotedAt = [...voteStores].sort((a, b) => a.votedAt.valueOf() - b.votedAt.valueOf());

      // const sortedVotedStores = [...user.votedCategoryOrder].reverse().reduce((result, categoryCode) => {
      //   const idx = result.findIndex(res => res.categoryCode === categoryCode);

      //   return [result[idx], ...result.slice(0, idx), ...result.slice(idx + 1)];
      // }, sortedByVotedAt);

      const emptyCategories = voteStores.reduce(
        (acc, { categoryCode }) => {
          const codeIdx = acc.findIndex(code => code === categoryCode);

          return [...acc.slice(0, codeIdx), ...acc.slice(codeIdx + 1)];
        },
        [...categoryCodes]
      );

      const newVoteStores = [...user.votedCategoryOrder].reverse().reduce(
        (acc, categoryCode) => {
          const idx = acc.findIndex(res => res.categoryCode === categoryCode);
          const result = idx !== -1 ? [acc[idx], ...acc.slice(0, idx), ...acc.slice(idx + 1)] : acc;

          return result;
        },
        [...voteStores].sort((a, b) => a.votedAt.valueOf() - b.votedAt.valueOf())
      );

      return { ...userInfo, voteStores: newVoteStores, emptyCategories };
    },
  });

  return data;
};

export default useUserProfile;
