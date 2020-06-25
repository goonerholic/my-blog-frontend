import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth from './authAsync/reducer';
import userAsync from './userAsync';
import write, { writeSaga } from './write';
import { authSaga } from './authAsync/sagas';
import { userSaga } from './userAsync';

const rootReducer = combineReducers({
	auth,
	userAsync,
	write,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
	yield all([authSaga(), userSaga(), writeSaga()]);
}
