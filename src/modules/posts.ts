import { createAsyncAction, createReducer } from 'typesafe-actions';
import { AxiosError, AxiosResponse } from 'axios';
import createAsyncSaga from '../lib/createAsyncSaga';
import * as postsAPI from '../lib/api/posts';
import { ListPostArgs, Post } from '../lib/api/posts';
import { AsyncState, createAsyncReducer } from '../lib/reducerUtils';
import { takeLatest } from 'redux-saga/effects';

// type declarations
interface PostsState {
	posts: AsyncState<Post[], AxiosError> | null;
}

// prefix
const prefix = 'posts';

// action types
const LIST_POSTS = `${prefix}/LIST_POSTS`;
const LIST_POSTS_SUCCESS = `${prefix}/LIST_POSTS_SUCCESS`;
const LIST_POSTS_FAILURE = `${prefix}/LIST_POSTS_FAILURE`;

// actions
export const listPostsActions = createAsyncAction(
	LIST_POSTS,
	LIST_POSTS_SUCCESS,
	LIST_POSTS_FAILURE,
)<ListPostArgs, [Post[], AxiosResponse<Post[]>], AxiosError>();

// sagas
const listPostsSaga = createAsyncSaga(listPostsActions, postsAPI.listPost);
export function* postsSaga() {
	yield takeLatest(LIST_POSTS, listPostsSaga);
}

// initial state
const initialState = {
	posts: null,
};

// reducer
const posts = createReducer<PostsState>(initialState, {
	...createAsyncReducer(listPostsActions, 'posts'),
});

export default posts;
