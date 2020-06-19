import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import './AuthForm.scss';

interface Props {
	type: string;
}

const textMap = {
	login: 'SIGN IN',
	register: 'SIGN UP',
};

export default function AuthForm({ type }: Props): ReactElement {
	return (
		<div className="AuthForm">
			<h3>{type}</h3>
			<form>
				<input
					autoComplete="username"
					name="username"
					placeholder="ID"
				/>
				<input
					autoComplete="new-password"
					name="password"
					placeholder="PASSWORD"
					type="password"
				/>
				<Button color="blue" size="full">
					SIGN IN
				</Button>
			</form>
			<div className="footer">
				<Link to="/register">SIGN UP</Link>
			</div>
		</div>
	);
}
