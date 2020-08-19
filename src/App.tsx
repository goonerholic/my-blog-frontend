import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import { Helmet } from 'react-helmet-async';
import ErrorPage from './pages/ErrorPage';
import { useSelector } from 'react-redux';
import { RootState } from './modules';

function App() {
	const { user } = useSelector(({ user }: RootState) => ({
		user: user.user,
	}));

	return (
		<div className="App">
			<Helmet>
				<title>보통인부</title>
			</Helmet>
			<Switch>
				<Route
					component={PostListPage}
					path={['/@:username', '/']}
					exact
				/>
				<Route component={LoginPage} path={'/login'} />
				<Route component={RegisterPage} path={'/register'} />
				<Route
					render={() =>
						user.data ? (
							<WritePage />
						) : (
							<Redirect to={{ pathname: '/login' }} />
						)
					}
					path={'/write'}
				/>
				<Route component={PostPage} path={'/@:username/:postId'} />
				<Route component={ErrorPage} />
			</Switch>
		</div>
	);
}

export default App;
