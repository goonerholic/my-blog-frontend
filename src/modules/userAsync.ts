import { createAsyncAction } from 'typesafe-actions';
import { UserInfo } from '../lib/api/auth';
import { AxiosError } from 'axios';
import * as authAPI from '../lib/api/auth';
import createAsyncSaga from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import { createReducer, ActionType } from 'typesafe-actions';
import {
	transformToArray,
	createAsyncReducer,
	asyncState,
	AsyncState,
} from '../lib/reducerUtils';

const prefix = 'user';

export const CHECK = `${prefix}_CHECK`;
export const CHECK_SUCCESS = `${prefix}_CHECK_SUCCESS`;
export const CHECK_FAILURE = `${prefix}_CHECK_FAILURE`;

export const userCheckAction = createAsyncAction(
	CHECK,
	CHECK_SUCCESS,
	CHECK_FAILURE,
)<'', any, AxiosError>();

const userCheckSaga = createAsyncSaga(userCheckAction, authAPI.check);

export function* userSaga() {
	yield takeLatest(CHECK, userCheckSaga);
}

type UserState = {
	userProfile: AsyncState<UserInfo, Error>;
};

const initialState: UserState = {
	userProfile: asyncState.initial(),
};

const user = createReducer<UserState, ActionType<typeof userCheckAction>>(
	initialState,
).handleAction(
	transformToArray(userCheckAction),
	createAsyncReducer(userCheckAction, 'userProfile'),
);

export default user;
