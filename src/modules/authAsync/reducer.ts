import { UserInfo } from '../../lib/api/auth';
import { authRegisterAction, authLoginAction } from './actions';
import { createReducer, ActionType, createAction } from 'typesafe-actions';
import {
	createAsyncReducer,
	asyncState,
	AsyncState,
} from '../../lib/reducerUtils';

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
	auth: AsyncState<UserInfo, Error>;
}

//actions types
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
