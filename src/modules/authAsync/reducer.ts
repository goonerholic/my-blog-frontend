import { UserInfo } from '../../lib/api/auth';
import {
	authRegisterAction,
	authLoginAction,
	CHANGE_FIELD,
	INITIALIZE_FORM,
	initializeForm,
	changeField,
} from './actions';
import { createReducer, ActionType } from 'typesafe-actions';
import {
	createAsyncReducer,
	asyncState,
	AsyncState,
} from '../../lib/reducerUtils';

// type declaration
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
