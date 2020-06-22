import { createAction, createReducer, ActionType } from 'typesafe-actions';
import { takeLatest } from 'redux-saga/effects';

import createRequestSaga, {
	createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

type FormType = 'register' | 'login';

interface UserInfo {
	_id: string;
	username: string;
}

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
}

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const registerAsyncAction = 

export const changeField = createAction(
	CHANGE_FIELD,
	({ form, key, value }: ChangeFieldInput) => ({ form, key, value }),
)();

export const initializeForm = createAction(
	INITIALIZE_FORM,
	(form: FormType) => form,
)();

const actions = { changeField, initializeForm };
type AuthAction = ActionType<typeof actions>;

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

const initialState = {
	register: {
		username: '',
		password: '',
		passwordConfirm: '',
	},
	login: {
		username: '',
		password: '',
	},
	auth: null,
	authError: null,
};

const auth = createReducer<AuthState, AuthAction>(initialState)
	.handleAction(changeField, (state, { payload: { form, key, value } }) => ({
		...state,
		[form]: { ...state[form], [key]: value },
	}))
	.handleAction(initializeForm, (state, { payload: form }) => ({
		...state,
		[form]: initialState[form],
	}))
	.handleAction();

export default auth;
