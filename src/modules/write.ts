import {
	createAction,
	createReducer,
	createAsyncAction,
} from 'typesafe-actions';
import { AxiosError, AxiosResponse } from 'axios';
import createAsyncSaga from '../lib/createAsyncSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import { AsyncState } from '../lib/reducerUtils';
import { createAsyncReducer } from '../lib/reducerUtils';
import { WritePostArgs, WriteResponse, UpdatePostArgs } from '../lib/api/posts';
import { Post } from '../lib/api/posts';

// type declaration
interface WriteState extends WritePostArgs {
	post: AsyncState<WriteResponse, AxiosError> | null;
	originalPostId: string | null;
}

// prefix
const prefix = 'write';

// action types
const INITIALIZE = `${prefix}/INITIALIZE`;
const CHANGE_FIELD = `${prefix}/CHANGE_FIELD`;
const SET_ORIGINAL_POST = `${prefix}/SET_ORIGINAL_POST`;

const WRITE_POST = `${prefix}/WRITE_POST`;
const WRITE_POST_SUCCESS = `${prefix}/WRITE_POST_SUCCESS`;
const WRITE_POST_FAILURE = `${prefix}/WRITE_POST_FAILURE`;

const UPDATE_POST = `${prefix}/UPDATE_POST`;
const UPDATE_POST_SUCCESS = `${prefix}/UPDATE_POST_SUCCESS`;
const UPDATE_POST_FAILURE = `${prefix}/UPDATE_POST_FAILURE`;

// actions
export const initialize = createAction(INITIALIZE)();
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
	key,
	value,
}))();
export const setOriginalPost = createAction(
	SET_ORIGINAL_POST,
	(post) => post,
)();

export const writePost = createAsyncAction(
	WRITE_POST,
	WRITE_POST_SUCCESS,
	WRITE_POST_FAILURE,
)<WritePostArgs, [Post, AxiosResponse<Post>], AxiosError>();

export const updatePost = createAsyncAction(
	UPDATE_POST,
	UPDATE_POST_SUCCESS,
	UPDATE_POST_FAILURE,
)<UpdatePostArgs, [Post, AxiosResponse<Post>], AxiosError>();

// sagas
const writePostSaga = createAsyncSaga(writePost, postsAPI.writePost);
const updatePostSaga = createAsyncSaga(updatePost, postsAPI.updatePost);
export function* writeSaga() {
	yield takeLatest(WRITE_POST, writePostSaga);
	yield takeLatest(UPDATE_POST, updatePostSaga);
}

// initial state
const initialState = {
	title: '',
	body: '',
	tags: [],
	post: null,
	originalPostId: null,
};

// reducer
const write = createReducer<WriteState>(initialState, {
	[INITIALIZE]: () => initialState,
	[CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
		...state,
		[key]: value,
	}),
	[SET_ORIGINAL_POST]: (state, { payload: post }) => ({
		...state,
		title: post.title,
		body: post.body,
		tags: post.tags,
		originalPostId: post._id,
	}),
	...createAsyncReducer(writePost, 'post'),
	...createAsyncReducer(updatePost, 'post'),
});

export default write;
