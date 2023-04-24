import axios from 'axios';

const url = `/api/votes`;

const fetchVotes = async () => {
  const response = await axios.get(`${url}`);

  return response.data;
};

const fetchVotesByNickname = nickname => async () => {
  const response = await axios.get(`${url}/${nickname}`);

  return response.data;
};

const checkCategory = (nickname, category) => async () => {
  const response = await axios.get(`${url}/${nickname}/${category}`);

  return response.data;
};

const vote = (nickname, storeId, newCode) => async () => {
  const response = await axios.patch(`${url}/${nickname}/${storeId}`, { newCode });

  return response.data;
};

export { fetchVotes, fetchVotesByNickname, checkCategory, vote };
