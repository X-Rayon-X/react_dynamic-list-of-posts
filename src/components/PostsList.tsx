import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

interface Props {
  posts: Post[];
}

export const PostsList: React.FC<Props> = ({ posts }) => (
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
        <PostItem post={post} key={post.id} />
      ))}
    </table>
  </div>
);
