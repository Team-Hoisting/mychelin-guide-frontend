import axios from 'axios';

const url = `/api/users`;

const fetchUserByNickname = nickname => async () => {
  const response = await axios.get(`${url}/${nickname}`);

  return response.data;
};

export default fetchUserByNickname;
