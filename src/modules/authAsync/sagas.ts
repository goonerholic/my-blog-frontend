import {
	authRegisterAction,
	authLoginAction,
	REGISTER,
	LOGIN,
} from './actions';
import * as authAPI from '../../lib/api/auth';
import createAsyncSaga from '../../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';

const authRegisterSaga = createAsyncSaga(authRegisterAction, authAPI.register);
const authLoginSaga = createAsyncSaga(authLoginAction, authAPI.login);

export function* authSaga() {
	yield takeLatest(REGISTER, authRegisterSaga);
	yield takeLatest(LOGIN, authLoginSaga);
}
