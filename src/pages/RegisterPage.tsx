import React, { ReactElement } from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from '../components/auth/AuthForm';

interface Props {}

export default function RegisterPage({}: Props): ReactElement {
	return (
		<AuthTemplate>
			<AuthForm />
		</AuthTemplate>
	);
}
