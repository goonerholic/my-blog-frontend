import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import post, { postSaga } from './post';
import write, { writeSaga } from './write';
import posts, { postsSaga } from './posts';

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
