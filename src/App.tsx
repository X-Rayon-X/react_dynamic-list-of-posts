import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import * as usersService from './api/users';
import * as postsService from './api/posts';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { LoaderState } from './types/LoaderState';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loaderPost, setLoaderPost] = useState<LoaderState>('initial');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function loadUsers() {
    usersService.getUsers().then(usersAPI => setUsers(usersAPI));
  }

  function loadPosts() {
    setLoaderPost('loading');

    postsService
      .getPosts()
      .then(postsAPI => {
        const currentPostOfUser = postsAPI.filter(
          postAPI => postAPI.userId === selectedUser?.id,
        );

        setPosts(currentPostOfUser);
        setErrorMessage(null);
      })
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => {
        setLoaderPost('loaded');
      });
  }

  useEffect(loadUsers, []);
  useEffect(loadPosts, [selectedUser]);

  const showNoPosts =
    !errorMessage &&
    loaderPost === 'loaded' &&
    posts.length === 0 &&
    selectedUser;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loaderPost === 'loading' && <Loader />}

                {errorMessage && loaderPost === 'loaded' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {showNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!errorMessage && !loaderPost && posts.length > 0 && (
                  <PostsList posts={posts} />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              'Sidebar--open',
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
