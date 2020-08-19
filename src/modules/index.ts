import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth from './auth';
import user from './user';
import post, { postSaga } from './post';
import write, { writeSaga } from './write';
import posts, { postsSaga } from './posts';
import { authSaga } from './auth';
import { userSaga } from './user';

const rootReducer = combineReducers({
	auth,
	user,
	write,
	post,
	posts,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
	yield all([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga()]);
}
