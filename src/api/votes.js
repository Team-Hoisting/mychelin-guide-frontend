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

const fetchPrevStore = (nickname, categoryCode) => async () => {
  if (categoryCode === null)
    return new Promise(resolve => {
      resolve(null);
    });

  const response = await axios.get(`${url}/${nickname}/${categoryCode}`);

  return response.data;
};

const vote = voteInfo => async () => {
  const response = await axios.post(url, voteInfo);

  return response.data;
};

const reVote = voteInfo => async () => {
  const { storeId, nickname, categoryCode, votedAt } = voteInfo;

  const response = await axios.patch(`${url}/${nickname}/${categoryCode}`, { storeId, votedAt });

  return response.data;
};

const removeVote = (nickname, categoryCode) => async () => {
  const response = await axios.delete(`${url}/${nickname}/${categoryCode}`);

  return response.data;
};

const fetchCategotySelectorData =
  ({ storeId, nickname, categoryCode }) =>
  async () => {
    const response = await axios.get(`${url}/${storeId}/${nickname}/${categoryCode}`);
    console.log(storeId, nickname, categoryCode);
    return response.data;
  };

export { fetchVotes, fetchVotesByNickname, fetchPrevStore, vote, reVote, removeVote, fetchCategotySelectorData };
