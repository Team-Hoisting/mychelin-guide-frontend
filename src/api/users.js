import axios from 'axios';

const url = `/api/users`;

const fetchUserAllInfoByNickname = nickname => async () => {
  const response = await axios.get(`${url}/all/${nickname}`);

  return response.data;
};

export default fetchUserAllInfoByNickname;
