import {
	createAsyncAction,
	createAction,
	createReducer,
} from 'typesafe-actions';
import { AxiosError } from 'axios';
import createAsyncSaga from './../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import { createAsyncReducer, AsyncState } from '../lib/reducerUtils';

// type declarations
export interface Post {
	_id: string;
	title: string;
	body: string;
	tags: string[];
	user: {
		_id: string;
		username: string;
	};
	publishedDate: Date;
}

export interface PostState {
	post: AsyncState<Post, AxiosError> | null;
}

// prefix
const prefix = 'post';

// action types
const READ_POST = `${prefix}/READ_POST`;
const READ_POST_SUCCESS = `${prefix}/READ_POST_SUCCESS`;
const READ_POST_FAILURE = `${prefix}/READ_POST_FAILURE`;

const UNLOAD_POST = `${prefix}/UNLOAD_POST`;

// action creators
export const postAsyncActions = createAsyncAction(
	READ_POST,
	READ_POST_SUCCESS,
	READ_POST_FAILURE,
)<string, any, AxiosError>();

export const unloadPost = createAction(UNLOAD_POST)();

// sagas
const readPostSaga = createAsyncSaga(postAsyncActions, postsAPI.readPost);
export function* postSaga() {
	yield takeLatest(READ_POST, readPostSaga);
}

// initial state
const initialState = {
	post: null,
};

// reducer
const post = createReducer<PostState>(initialState, {
	...createAsyncReducer(postAsyncActions, 'post'),
	[UNLOAD_POST]: () => initialState,
});

export default post;
