import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';

const prefix = 'auth';

export const REGISTER = `${prefix}_REGISTER`;
export const REGISTER_SUCCESS = `${prefix}_REGISTER_SUCCESS`;
export const REGISTER_FAILURE = `${prefix}_REGISTER_FAILURE`;

export const LOGIN = `${prefix}_LOGIN`;
export const LOGIN_SUCCESS = `${prefix}_LOGIN_SUCCESS`;
export const LOGIN_FAILURE = `${prefix}_LOGIN_FAILURE`;

type AuthInput = {
	username: string;
	password: string;
};

export const authRegisterAction = createAsyncAction(
	REGISTER,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
)<AuthInput, any, AxiosError>();

export const authLoginAction = createAsyncAction(
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
)<AuthInput, any, AxiosError>();
