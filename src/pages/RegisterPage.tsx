import React, { ReactElement } from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from './../containers/auth/RegisterForm';

export default function RegisterPage(): ReactElement {
	return (
		<AuthTemplate>
			<RegisterForm />
		</AuthTemplate>
	);
}
