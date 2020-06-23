import { createAction, createReducer, ActionType } from 'typesafe-actions';
import { authRegisterAction, authLoginAction } from './authAsync/actions';

// types
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
}

//actions
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

//action creators
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
};

const auth = createReducer<AuthState, AuthAction>(initialState)
	.handleAction(changeField, (state, { payload: { form, key, value } }) => ({
		...state,
		[form]: { ...state[form], [key]: value },
	}))
	.handleAction(initializeForm, (state, { payload: form }) => ({
		...state,
		[form]: initialState[form],
	}));

export default auth;
