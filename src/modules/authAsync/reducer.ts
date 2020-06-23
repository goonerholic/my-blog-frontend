import { UserInfo } from '../../lib/api/auth';
import { authRegisterAction, authLoginAction } from './actions';
import { createReducer, ActionType } from 'typesafe-actions';
import {
	transformToArray,
	createAsyncReducer,
	asyncState,
	AsyncState,
} from '../../lib/reducerUtils';

type AuthState = {
	auth: AsyncState<UserInfo, Error>;
};

const initialState: AuthState = {
	auth: asyncState.initial(),
};

const authAsync = createReducer<
	AuthState,
	ActionType<typeof authRegisterAction>
>(initialState).handleAction(
	transformToArray(authRegisterAction),
	createAsyncReducer(authRegisterAction, 'auth'),
);
// .handleAction(
// 	transformToArray(authLoginAction),
// 	createAsyncReducer(authLoginAction, 'userProfile'),
// );

export default authAsync;
