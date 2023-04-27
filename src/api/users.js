import axios from 'axios';

const url = `/api/users`;

const fetchUserProfileInfoByNickname = nickname => async () => {
  const response = await axios.get(`${url}/${nickname}/profile`);

  return response.data;
};

const changeVotedCategoryOrder = (nickname, newOrder) => {
  axios.post(`${url}/${nickname}/votedcategoryorder`, { votedCategoryOrder: newOrder });
};

export { fetchUserProfileInfoByNickname, changeVotedCategoryOrder };
