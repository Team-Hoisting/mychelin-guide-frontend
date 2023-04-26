import axios from 'axios';

const url = `/api/stores`;

// const fetchStores = async pageParam => {
//   console.log('매개변수로 받음', pageParam);

//   const response = await axios.get(`${url}?category=${}&pageParams=${pageParam}&pageSize=${15}`);

//   console.log(response.data);

//   return response.data;
// };

const fetchSearchedStores = async userSearch => {
  const response = await axios.get(`${url}/search?usersearch=${userSearch}`);

  // console.log('[Inside API func]', response.data);

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

export { fetchSearchedStores, fetchStore, fetchStoreItem };
