import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import { Helmet } from 'react-helmet-async';
import ErrorPage from './pages/ErrorPage';

function App() {
	return (
		<div className="App">
			<Helmet>
				<title>GOONERHOLIC</title>
			</Helmet>
			<Switch>
				<Route
					component={PostListPage}
					path={['/@:username', '/']}
					exact
				/>
				<Route component={LoginPage} path={'/login'} />
				<Route component={RegisterPage} path={'/register'} />
				<Route component={WritePage} path={'/write'} />
				<Route component={PostPage} path={'/@:username/:postId'} />
				<Route component={ErrorPage} />
			</Switch>
		</div>
	);
}

export default App;
