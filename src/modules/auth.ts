import { createAction, createReducer, ActionType } from 'typesafe-actions';
import { transformToArray, createAsyncReducer } from './../lib/reducerUtils';
import { authRegisterAction, authLoginAction } from './authAsync/actions';

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
	auth: {
		_id: string;
		username: string;
	} | null;
}

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

export const changeField = createAction(
	CHANGE_FIELD,
	({ form, key, value }: ChangeFieldInput) => ({ form, key, value }),
)();

export const initializeForm = createAction(
	INITIALIZE_FORM,
	(form: FormType) => form,
)();

const actions = {
	changeField,
	initializeForm,
	authRegisterAction,
	authLoginAction,
};
type AuthAction = ActionType<typeof actions>;

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
	.handleAction(
		transformToArray(authRegisterAction),
		createAsyncReducer(authRegisterAction, 'auth'),
	)
	.handleAction(
		transformToArray(authLoginAction),
		createAsyncReducer(authLoginAction, 'auth'),
	);

export default auth;
