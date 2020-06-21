import { call, put } from 'redux-saga/effects';
import { createAsyncAction } from 'typesafe-actions';
import { startLoading, finishLoading } from '../modules/loading';

export function createRequestActionTypes(type: string): any {
	return createAsyncAction(
		`${type}_REQUEST`,
		`${type}_SUCCESS`,
		`${type}_FAILURE`,
	)<string, [], Error>();
}

export default function createRequestSaga<R>(type: string, request: R) {
	const SUCCESS = `${type}_SUCCESS`;
	const FAILURE = `${type}_FAILURE`;

	return function* (action: any) {
		yield put(startLoading(type));
		try {
			const response = yield call(request, action.payload);
			yield put({
				type: SUCCESS,
				payload: response.data,
			});
		} catch (e) {
			yield put({
				type: FAILURE,
				payload: e,
				error: true,
			});
		}
		yield put(finishLoading(type));
	};
}
