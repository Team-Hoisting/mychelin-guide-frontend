import axios from 'axios';

const url = `/api/comments`;

const fetchComment = storeid => async () => {
  const response = await axios.get(`${url}/${storeid}`);

  return response.data;
};

export default fetchComment;
