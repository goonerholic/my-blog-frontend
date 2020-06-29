import { call, put } from 'redux-saga/effects';
import { AsyncActionCreatorBuilder, PayloadAction } from 'typesafe-actions';
import { AxiosResponse } from 'axios';

type PromiseCreatorFunction<P, T> =
	| ((payload: P) => Promise<AxiosResponse<T>>)
	| (() => Promise<AxiosResponse<T>>);

function isPayloadAction<P>(action: any): action is PayloadAction<string, P> {
	return action.payload !== undefined;
}

export default function createAsyncSaga<T1, P1, T2, P2, T3, P3>(
	asyncActionCreator: AsyncActionCreatorBuilder<
		[T1, [P1, undefined]],
		[T2, [P2, AxiosResponse]],
		[T3, [P3, undefined]]
	>,
	promiseCreator: PromiseCreatorFunction<P1, P2>,
) {
	return function* saga(
		action: ReturnType<typeof asyncActionCreator.request>,
	) {
		try {
			const response: AxiosResponse = isPayloadAction<P1>(action)
				? yield call(promiseCreator, action.payload)
				: yield call(promiseCreator);
			yield put(asyncActionCreator.success(response.data, response));
		} catch (e) {
			yield put(asyncActionCreator.failure(e));
		}
	};
}
