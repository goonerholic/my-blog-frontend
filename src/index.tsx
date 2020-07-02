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
import { tempSetUser } from './modules/user';
import { userCheckAction } from './modules/user';
import { HelmetProvider } from 'react-helmet-async';

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
			<HelmetProvider>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</HelmetProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);

serviceWorker.unregister();
