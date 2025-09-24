import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

interface Props {
  post: Post;
  isOpenPost: boolean;
  setIsOpenPost: (value: boolean) => void;
  setSelectedPost: (post: Post) => void;
}

export const PostItem: React.FC<Props> = ({
  post,
  isOpenPost,
  setIsOpenPost,
  setSelectedPost,
}) => {
  function handleSelect(postTake: Post) {
    setSelectedPost(postTake);
    setIsOpenPost(!isOpenPost);
  }

  return (
    <tbody>
      <tr data-cy="Post">
        <td data-cy="PostId">{post.id}</td>

        <td data-cy="PostTitle">{post.title}</td>

        <td className="has-text-right is-vcentered">
          <button
            type="button"
            data-cy="PostButton"
            className={classNames('button is-link', {
              'is-light': !isOpenPost,
            })}
            onClick={() => handleSelect(post)}
          >
            {isOpenPost ? 'Close' : 'Open'}
          </button>
        </td>
      </tr>
    </tbody>
  );
};
