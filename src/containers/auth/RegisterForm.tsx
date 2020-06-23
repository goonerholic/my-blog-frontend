import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { RootState } from '../../modules';
import { authRegisterAction } from '../../modules/authAsync/actions';
import { check } from '../../lib/api/auth';
import { userCheckAction } from '../../modules/userAsync';
import { withRouter } from 'react-router-dom';

interface RegisterFormProps {
	history: any;
}

export default withRouter(function RegisterForm({ history }): ReactElement {
	const dispatch = useDispatch();
	const { form, auth } = useSelector((state: RootState) => ({
		form: state.auth.register,
		auth: state.authAsync.auth,
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
			return;
		}
		dispatch(authRegisterAction.request({ username, password }));
	};

	useEffect(() => {
		dispatch(initializeForm('register'));
	}, [dispatch]);

	useEffect(() => {
		if (auth.error) {
			console.log('오류');
			console.log(auth.error);
			return;
		}
		if (auth.data) {
			console.log('회원가입 성공');
			console.log(auth.data);
			dispatch(userCheckAction.request(''));
		}
	}, [dispatch, auth]);

	useEffect(() => {
		if (auth.data) {
			history.push('/');
		}
	}, [history, auth.data]);
	return (
		<AuthForm
			type="register"
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
});
