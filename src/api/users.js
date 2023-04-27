import axios from 'axios';

const url = `/api/users`;

const fetchUserProfileInfoByNickname = nickname => async () => {
  const response = await axios.get(`${url}/${nickname}/profile`);

  return response.data;
};

const changeVotedCategoryOrder = (nickname, newOrder) => {
  axios.post(`${url}/${nickname}/votedcategoryorder`, { votedCategoryOrder: newOrder });
};
const editUserInfo = (nickname, content) => async () => {
  const response = await axios.patch(`${url}/${nickname}`, content);

  return response.data;
};

export { fetchUserProfileInfoByNickname, editUserInfo, changeVotedCategoryOrder };
