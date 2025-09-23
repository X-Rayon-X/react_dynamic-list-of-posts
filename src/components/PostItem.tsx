import React from 'react';
import { Post } from '../types/Post';

interface Props {
  post: Post;
}

export const PostItem: React.FC<Props> = ({ post }) => {
  return (
    <tbody>
      <tr data-cy="Post">
        <td data-cy="PostId">{post.id}</td>

        <td data-cy="PostTitle">{post.title}</td>

        <td className="has-text-right is-vcentered">
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link is-light"
          >
            Open
          </button>
        </td>
      </tr>
    </tbody>
  );
};
