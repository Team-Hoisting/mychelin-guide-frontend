import axios from 'axios';

const url = `/api/stores`;

const fetchStores = async () => {
  const response = await axios.get(`${url}`);

  return response.data;
};

const fetchStoreItem = async id => {
  const response = await axios.get(`${url}/${id}`);

  return response.data;
};

const fetchStore = storeid => async () => {
  const response = await axios.get(`${url}/${storeid}`);

  return response.data;
};

export { fetchStores, fetchStore, fetchStoreItem };
