import axios from 'axios';
import COMMENTS_FETCH_SIZE from '../constants/commentsFetchSize';

const url = `/api/comments`;

const fetchComments =
  (id, pageParam = 1) =>
  async () => {
    const url = `/api/comments/${id}?page=${pageParam}&pageSize=${COMMENTS_FETCH_SIZE}`;

    const { data } = await axios.get(url);

    return data;
  };

const postComment =
  ({ storeId, content, email }) =>
  async () => {
    await axios.post(url, { storeId, email, content });
  };

export { fetchComments, postComment };
