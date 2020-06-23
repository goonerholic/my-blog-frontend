import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import authForm from './authForm';
import { authRegister, authLogin } from './authAsync/reducer';
import user from './userAsync';
import { authSaga } from './authAsync/sagas';
import { userSaga } from './userAsync';

const rootReducer = combineReducers({
	authForm,
	authRegister,
	authLogin,
	user,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
	yield all([authSaga(), userSaga()]);
}
