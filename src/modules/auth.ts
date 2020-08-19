import { createAsyncAction, createAction } from 'typesafe-actions';
import { AxiosError, AxiosResponse } from 'axios';
import { AuthArgs, AuthResponse } from '../lib/api/auth';
import * as authAPI from '../lib/api/auth';
import createAsyncSaga from '../lib/createAsyncSaga';
import { takeLatest, all } from 'redux-saga/effects';
import { createReducer, ActionType } from 'typesafe-actions';
import {
	createAsyncReducer,
	asyncState,
	AsyncState,
} from '../lib/reducerUtils';

// interface, types
type FormType = 'register' | 'login';

interface ChangeFieldInput {
	form: FormType;
	key: string;
	value: string;
}

interface AuthState {
	register: {
		username: string;
		password: string;
		passwordConfirm: string;
	};
	login: {
		username: string;
		password: string;
	};
	auth: AsyncState<AuthResponse, AxiosError>;
}

// prefix
const prefix = 'auth';

// action types
export const CHANGE_FIELD = `${prefix}/CHANGE_FIELD`;
export const INITIALIZE_FORM = `${prefix}/INITIALIZE_FORM`;

// async action types
export const REGISTER = `${prefix}/REGISTER`;
export const REGISTER_SUCCESS = `${prefix}/REGISTER_SUCCESS`;
export const REGISTER_FAILURE = `${prefix}/REGISTER_FAILURE`;

export const LOGIN = `${prefix}/LOGIN`;
export const LOGIN_SUCCESS = `${prefix}/LOGIN_SUCCESS`;
export const LOGIN_FAILURE = `${prefix}/LOGIN_FAILURE`;

// action creators
export const changeField = createAction(
	CHANGE_FIELD,
	({ form, key, value }: ChangeFieldInput) => ({ form, key, value }),
)();

export const initializeForm = createAction(
	INITIALIZE_FORM,
	(form: FormType) => form,
)();

// async action creators
export const authRegisterAction = createAsyncAction(
	REGISTER,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
)<AuthArgs, [AuthResponse, AxiosResponse<AuthResponse>], AxiosError>();

export const authLoginAction = createAsyncAction(
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
)<AuthArgs, [AuthResponse, AxiosResponse<AuthResponse>], AxiosError>();

// saga

const authRegisterSaga = createAsyncSaga(authRegisterAction, authAPI.register);
const authLoginSaga = createAsyncSaga(authLoginAction, authAPI.login);

export function* authSaga() {
	yield all([
		takeLatest(REGISTER, authRegisterSaga),
		takeLatest(LOGIN, authLoginSaga),
	]);
}

// initial state
const initialState: AuthState = {
	register: {
		username: '',
		password: '',
		passwordConfirm: '',
	},
	login: {
		username: '',
		password: '',
	},
	auth: asyncState.initial(),
};

// reducer
const auth = createReducer<AuthState>(initialState, {
	...createAsyncReducer(authRegisterAction, 'auth'),
	...createAsyncReducer(authLoginAction, 'auth'),
	[CHANGE_FIELD]: (
		state: AuthState,
		{ payload: { form, key, value } }: ActionType<typeof changeField>,
	) => ({
		...state,
		[form]: { ...state[form], [key]: value },
	}),
	[INITIALIZE_FORM]: (
		state: AuthState,
		{ payload: form }: ActionType<typeof initializeForm>,
	) => ({
		...state,
		[form]: initialState[form],
		auth: initialState.auth,
	}),
});

export default auth;
