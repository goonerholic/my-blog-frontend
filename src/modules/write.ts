import {
	createAction,
	createReducer,
	createAsyncAction,
} from 'typesafe-actions';
import { AxiosError } from 'axios';
import createAsyncSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import { AsyncState } from '../lib/reducerUtils';
import { createAsyncReducer } from '../lib/reducerUtils';

// type declaration
interface WritePayload {
	title: string;
	body: string;
	tags: string[];
}

interface WriteResponse extends WritePayload {
	_id: string;
	user: {
		_id: string;
		username: string;
	};
}

interface WriteState extends WritePayload {
	post: AsyncState<WriteResponse, AxiosError> | null;
}

// prefix
const prefix = 'write';

// action types
const INITIALIZE = `${prefix}/INITIALIZE`;
const CHANGE_FIELD = `${prefix}/CHANGE_FIELD`;

const WRITE_POST = `${prefix}/WRITE_POST`;
const WRITE_POST_SUCCESS = `${prefix}/WRITE_POST_SUCCESS`;
const WRITE_POST_FAILURE = `${prefix}/WRITE_POST_FAILURE`;

// actions
export const initialize = createAction(INITIALIZE)();
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
	key,
	value,
}))();
export const writePostAsync = createAsyncAction(
	WRITE_POST,
	WRITE_POST_SUCCESS,
	WRITE_POST_FAILURE,
)<WritePayload, any, AxiosError>();

// sagas
const writePostSaga = createAsyncSaga(writePostAsync, postsAPI.writePost);
export function* writeSaga() {
	yield takeLatest(WRITE_POST, writePostSaga);
}

// initial state
const initialState = {
	title: '',
	body: '',
	tags: [],
	post: null,
};

// reducer
const write = createReducer<WriteState>(initialState, {
	[INITIALIZE]: (state) => initialState,
	[CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
		...state,
		[key]: value,
	}),
	...createAsyncReducer(writePostAsync, 'post'),
});

export default write;
