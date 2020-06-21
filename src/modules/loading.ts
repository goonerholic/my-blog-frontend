import { createAction, createReducer, ActionType } from 'typesafe-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(
	START_LOADING,
	(requestType: string) => requestType,
)();
export const finishLoading = createAction(
	FINISH_LOADING,
	(requestType: string) => requestType,
)();

const actions = {
	startLoading,
	finishLoading,
};

type LoadingAction = ActionType<typeof actions>;

const initialState = {};

const loading = createReducer<any, LoadingAction>(initialState) //type of state needs to be updated.
	.handleAction(startLoading, (state, action) => ({
		...state,
		[action.payload]: true,
	}))
	.handleAction(finishLoading, (state, action) => ({
		...state,
		[action.payload]: false,
	}));

export default loading;
