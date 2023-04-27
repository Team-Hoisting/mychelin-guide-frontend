import axios from 'axios';

const url = `/api/users`;

const fetchUserAllInfoByNickname = nickname => async () => {
  const response = await axios.get(`${url}/${nickname}/all`);

  return response.data;
};

const changeVotedCategoryOrder = (nickname, newOrder) => {
  axios.post(`${url}/${nickname}/votedcategoryorder`, { votedCategoryOrder: newOrder });
};

export { fetchUserAllInfoByNickname, changeVotedCategoryOrder };
