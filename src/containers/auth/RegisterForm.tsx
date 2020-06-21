import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { RootState } from '../../modules';

export default function RegisterForm(): ReactElement {
	const dispatch = useDispatch();
	const { form } = useSelector((state: RootState) => ({
		form: state.auth.register,
	}));

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		dispatch(changeField({ form: 'register', key: name, value }));
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	useEffect(() => {
		dispatch(initializeForm('register'));
	}, [dispatch]);
	return (
		<AuthForm
			type="register"
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
}
