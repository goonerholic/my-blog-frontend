import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import './AuthForm.scss';

interface Props {
	type: 'login' | 'register';
	form: {
		username: string;
		password: string;
		passwordConfirm?: string;
	};
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const textMap = {
	login: 'SIGN IN',
	register: 'SIGN UP',
};

export default function AuthForm({
	type,
	form,
	onChange,
	onSubmit,
}: Props): ReactElement {
	const text = textMap[type];
	return (
		<div className="AuthForm">
			<h3>{text}</h3>
			<form onSubmit={onSubmit}>
				<input
					autoComplete="username"
					name="username"
					placeholder="ID"
					onChange={onChange}
					value={form.username}
				/>
				<input
					autoComplete="new-password"
					name="password"
					placeholder="PASSWORD"
					type="password"
					onChange={onChange}
					value={form.password}
				/>
				{type === 'register' && (
					<input
						autoComplete="new-password"
						name="passwordConfirm"
						placeholder="CONFIRM PASSWORD"
						type="password"
						onChange={onChange}
						value={form.passwordConfirm}
					/>
				)}
				<Button color="blue" size="full">
					{text}
				</Button>
			</form>
			<div className="footer">
				{type === 'login' ? (
					<Link to="/register">SIGN UP</Link>
				) : (
					<Link to="/login">SIGN IN</Link>
				)}
			</div>
		</div>
	);
}
