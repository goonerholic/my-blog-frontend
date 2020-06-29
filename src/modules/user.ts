import { createAsyncAction, createAction } from 'typesafe-actions';
import { AuthResponse } from '../lib/api/auth';
import { AxiosError, AxiosResponse } from 'axios';
import * as authAPI from '../lib/api/auth';
import createAsyncSaga from '../lib/createAsyncSaga';
import { takeLatest, call } from 'redux-saga/effects';
import { createReducer } from 'typesafe-actions';
import { asyncState, AsyncState } from '../lib/reducerUtils';
import { createAsyncReducer } from '../lib/reducerUtils';

// type declaration
type UserState = {
	user: AsyncState<AuthResponse, AxiosError>;
	checkError: null;
};

// prefix
const prefix = 'user';

// action types
const CHECK = `${prefix}/CHECK`;
const CHECK_SUCCESS = `${prefix}/CHECK_SUCCESS`;
const CHECK_FAILURE = `${prefix}/CHECK_FAILURE`;
const TEMP_SET_USER = `${prefix}/TEMP_SET_USER`;

const LOGOUT = `${prefix}/LOGOUT`;

// actions
export const tempSetUser = createAction(TEMP_SET_USER, (user) => user)();
export const logout = createAction(LOGOUT)();

export const userCheckAction = createAsyncAction(
	CHECK,
	CHECK_SUCCESS,
	CHECK_FAILURE,
)<'', [AuthResponse, AxiosResponse<AuthResponse>], AxiosError>();

// sagas
const userCheckSaga = createAsyncSaga(userCheckAction, authAPI.check);

function checkFailureSaga() {
	try {
		localStorage.removeItem('user');
	} catch (e) {
		console.log('localStorage not working.');
	}
}

function* logoutSaga() {
	try {
		yield call(authAPI.logout);
		localStorage.removeItem('user');
	} catch (e) {
		console.log(e);
	}
}

export function* userSaga() {
	yield takeLatest(CHECK, userCheckSaga);
	yield takeLatest(CHECK_FAILURE, checkFailureSaga);
	yield takeLatest(LOGOUT, logoutSaga);
}

// initial state
const initialState: UserState = {
	user: asyncState.initial(),
	checkError: null,
};
// reducer
const user = createReducer<UserState>(initialState, {
	...createAsyncReducer(userCheckAction, 'user'),
	[LOGOUT]: (state) => ({
		...state,
		user: asyncState.initial(),
	}),
	[TEMP_SET_USER]: (state, action) => ({
		...state,
		user: asyncState.success(action.payload),
	}),
});

export default user;
