import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

interface Props {
  posts: Post[];
  isOpenPost: boolean;
  setIsOpenPost: (value: boolean) => void;
  setSelectedPost: (post: Post) => void;
  loadComments: (postId: number) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  isOpenPost,
  setIsOpenPost,
  setSelectedPost,
  loadComments,
}) => (
  <div data-cy="PostsList">
    <p className="title">Posts:</p>

    <table className="table is-fullwidth is-striped is-hoverable is-narrow">
      <thead>
        <tr className="has-background-link-light">
          <th>#</th>
          <th>Title</th>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th> </th>
        </tr>
      </thead>

      {posts.map(post => (
        <PostItem
          post={post}
          isOpenPost={isOpenPost}
          setIsOpenPost={setIsOpenPost}
          setSelectedPost={setSelectedPost}
          loadComments={loadComments}
          key={post.id}
        />
      ))}
    </table>
  </div>
);
