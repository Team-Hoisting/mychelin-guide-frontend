import axios from 'axios';

const url = `/api/comments`;

const fetchComment = storeid => async () => {
  const response = await axios.get(`${url}/${storeid}`);

  return response.data;
};

const postComment =
  ({ storeId, content, email }) =>
  async () => {
    await axios.post(url, { storeId, email, content });
  };

const fetchComments = () => async () => {
  const response = await axios.get(url);
  return response.data;
};

export { fetchComment, fetchComments, postComment };
