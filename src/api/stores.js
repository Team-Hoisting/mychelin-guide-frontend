import axios from 'axios';

const url = `/api/stores`;

const fetchStores = async () => {
  const response = await axios.get(`${url}`);

  return response.data;
};

export default fetchStores;
