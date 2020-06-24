import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from '../../modules/authAsync/actions';
import AuthForm from '../../components/auth/AuthForm';
import { RootState } from '../../modules';
import { authRegisterAction } from '../../modules/authAsync/actions';
import { userCheckAction } from '../../modules/userAsync';
import { withRouter } from 'react-router-dom';

export default withRouter(function RegisterForm({ history }): ReactElement {
	const [error, setError] = useState<string | null>(null);
	const dispatch = useDispatch();
	const { form, auth, user } = useSelector((state: RootState) => ({
		form: state.auth.register,
		auth: state.auth.auth,
		user: state.userAsync.userProfile,
	}));

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		dispatch(changeField({ form: 'register', key: name, value }));
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { username, password, passwordConfirm } = form;
		if (password !== passwordConfirm) {
			// some error handling code
			setError('비밀번호가 일치하지 않습니다.');
			return;
		}
		dispatch(authRegisterAction.request({ username, password }));
	};

	useEffect(() => {
		dispatch(initializeForm('register'));
	}, [dispatch, auth]);

	useEffect(() => {
		if (auth.error) {
			console.log('오류');
			console.log(auth.error);
			setError('회원가입 실패');
			return;
		}
		if (auth.data) {
			console.log('회원가입 성공');
			console.log(auth.data);
			dispatch(userCheckAction.request(''));
		}
	}, [dispatch, auth]);

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
			type="register"
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
			error={error}
		/>
	);
});
