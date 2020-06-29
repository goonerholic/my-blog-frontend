import {
	authRegisterAction,
	authLoginAction,
	REGISTER,
	LOGIN,
} from './actions';
import * as authAPI from '../../lib/api/auth';
import createAsyncSaga from '../../lib/createAsyncSaga';
import { takeLatest, all } from 'redux-saga/effects';

const authRegisterSaga = createAsyncSaga(authRegisterAction, authAPI.register);
const authLoginSaga = createAsyncSaga(authLoginAction, authAPI.login);

export function* authSaga() {
	yield all([
		takeLatest(REGISTER, authRegisterSaga),
		takeLatest(LOGIN, authLoginSaga),
	]);
}
