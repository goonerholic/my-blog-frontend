import React, { ReactElement } from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from './../containers/auth/RegisterForm';

interface Props {}

export default function RegisterPage({}: Props): ReactElement {
	return (
		<AuthTemplate>
			<RegisterForm />
		</AuthTemplate>
	);
}
