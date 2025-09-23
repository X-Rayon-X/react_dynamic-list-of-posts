import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = () => {
  return client.get<Post[]>('/posts');
};
