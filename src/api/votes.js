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

export { fetchVotes, fetchVotesByNickname };
