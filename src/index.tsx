import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, { rootSaga } from './modules';
import { tempSetUser } from './modules/userAsync';
import { userCheckAction } from './modules/userAsync';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
	try {
		const user = localStorage.getItem('user');
		if (!user) return;

		store.dispatch(tempSetUser(JSON.parse(user)));
		store.dispatch(userCheckAction.request(''));
	} catch (e) {
		console.log('localStorage not working.');
	}
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);

serviceWorker.unregister();
