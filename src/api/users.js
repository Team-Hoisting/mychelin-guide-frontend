import axios from 'axios';

const url = `/api/users`;

const fetchUserAllInfoByNickname = nickname => async () => {
  const response = await axios.get(`${url}/all/${nickname}`);

  return response.data;
};

const editUserInfo = (nickname, content) => async () => {
  const response = await axios.patch(`${url}/${nickname}`, content);

  return response.data;
};

export { fetchUserAllInfoByNickname, editUserInfo };
