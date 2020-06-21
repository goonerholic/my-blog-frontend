import React, { ReactElement } from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from './../containers/auth/LoginForm';

export default function LoginPage(): ReactElement {
	return (
		<AuthTemplate>
			<LoginForm />
		</AuthTemplate>
	);
}
