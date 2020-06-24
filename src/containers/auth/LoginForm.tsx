import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from '../../modules/authAsync/reducer';
import { authLoginAction } from '../../modules/authAsync/actions';
import AuthForm from '../../components/auth/AuthForm';
import { RootState } from '../../modules';
import { userCheckAction } from '../../modules/userAsync';
import { withRouter } from 'react-router-dom';

export default withRouter(function LoginForm({ history }): ReactElement {
	const [error, setError] = useState<null | string>(null);
	const dispatch = useDispatch();
	const { form, auth, user } = useSelector((state: RootState) => ({
		form: state.auth.login,
		auth: state.auth.auth,
		user: state.userAsync.userProfile,
	}));

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		dispatch(changeField({ form: 'login', key: name, value }));
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { username, password } = form;
		dispatch(authLoginAction.request({ username, password }));
		dispatch(initializeForm('login'));
	};

	useEffect(() => {
		dispatch(initializeForm('login'));
	}, [dispatch, auth]);

	useEffect(() => {
		if (auth.error) {
			console.log('오류');
			console.log(auth.error);
			setError('로그인 실패');
		}
		if (auth.data) {
			console.log('로그인 성공');
			dispatch(userCheckAction.request(''));
		}
	}, [auth, dispatch]);

	useEffect(() => {
		if (user.data) {
			history.push('/');
			try {
				localStorage.setItem('user', JSON.stringify(user.data));
			} catch (e) {
				console.log('localStorage not working.');
			}
		}
	}, [history, user]);

	return (
		<AuthForm
			type="login"
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
			error={error}
		/>
	);
});
