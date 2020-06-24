import { createAsyncAction, createAction } from 'typesafe-actions';
import { UserInfo } from '../lib/api/auth';
import { AxiosError } from 'axios';
import * as authAPI from '../lib/api/auth';
import createAsyncSaga from '../lib/createRequestSaga';
import { takeLatest, call } from 'redux-saga/effects';
import { createReducer, ActionType } from 'typesafe-actions';
import { asyncState, AsyncState } from '../lib/reducerUtils';

const prefix = 'user';

const CHECK = `${prefix}/CHECK`;
const CHECK_SUCCESS = `${prefix}/CHECK_SUCCESS`;
const CHECK_FAILURE = `${prefix}/CHECK_FAILURE`;
const TEMP_SET_USER = `${prefix}/TEMP_SET_USER`;

const LOGOUT = `${prefix}/LOGOUT`;

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user)();
export const userCheckAction = createAsyncAction(
	CHECK,
	CHECK_SUCCESS,
	CHECK_FAILURE,
)<'', any, AxiosError>();
export const logout = createAction(LOGOUT)();

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

type UserState = {
	userProfile: AsyncState<UserInfo, Error>;
	checkError: null;
};

const initialState: UserState = {
	userProfile: asyncState.initial(),
	checkError: null,
};

const userAsync = createReducer<UserState>(initialState, {
	[CHECK]: (state) => ({
		...state,
		userProfile: asyncState.load(),
	}),
	[CHECK_SUCCESS]: (
		state,
		action: ActionType<typeof userCheckAction.success>,
	) => ({
		...state,
		userProfile: asyncState.success(action.payload),
	}),
	[CHECK_FAILURE]: (
		state,
		action: ActionType<typeof userCheckAction.failure>,
	) => ({
		...state,
		userProfile: asyncState.error(action.payload),
	}),
	[LOGOUT]: (state) => ({
		...state,
		userProfile: asyncState.initial(),
	}),
	[TEMP_SET_USER]: (state, action) => ({
		...state,
		userProfile: asyncState.success(action.payload),
	}),
});
// .handleAction(
// 	transformToArray(userCheckAction),
// 	createAsyncReducer(userCheckAction, 'userProfile'),
// )
// .handleAction(logout, (state) => ({
// 	...state,
// 	user: null,
// }));

export default userAsync;
