import { UserInfo } from '../../lib/api/auth';
import { authRegisterAction } from './actions';
import { createReducer, ActionType } from 'typesafe-actions';
import {
	transformToArray,
	createAsyncReducer,
	asyncState,
	AsyncState,
} from '../../lib/reducerUtils';

type UserState = {
	userProfile: AsyncState<UserInfo, Error>;
};

const initialState: UserState = {
	userProfile: asyncState.initial(),
};

const registerSaga = createReducer<
	UserState,
	ActionType<typeof authRegisterAction>
>(initialState).handleAction(
	transformToArray(authRegisterAction),
	createAsyncReducer(authRegisterAction, 'userProfile'),
);

export default registerSaga;
