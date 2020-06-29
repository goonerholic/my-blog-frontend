import { createAsyncAction, createAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { AuthArgs, AuthResponse } from '../../lib/api/auth';

// interface, types
type FormType = 'register' | 'login';

interface ChangeFieldInput {
	form: FormType;
	key: string;
	value: string;
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
)<AuthArgs, [AuthResponse, undefined], AxiosError>();

export const authLoginAction = createAsyncAction(
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
)<AuthArgs, [AuthResponse, undefined], AxiosError>();
