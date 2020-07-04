import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextInput } from 'react-materialize';
//import Button from '../common/Button';
import './AuthForm.scss';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

interface Props {
	type: 'login' | 'register';
	form: {
		username: string;
		password: string;
		passwordConfirm?: string;
	};
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	error: string | null;
}

interface ErrorMessageProps {
	children: string | null;
}

const textMap = {
	login: 'SIGN IN',
	register: 'SIGN UP',
};

function ErrorMessage({ children }: ErrorMessageProps): ReactElement {
	return <div className="ErrorMessage">{children}</div>;
}

export default function AuthForm({
	type,
	form,
	onChange,
	onSubmit,
	error,
}: Props): ReactElement {
	const text = textMap[type];
	return (
		<div className="AuthForm">
			<h5>{text}</h5>
			<form onSubmit={onSubmit}>
				<TextInput
					id="username"
					name="username"
					placeholder="ID"
					onChange={onChange}
					value={form.username}
				/>
				<TextInput
					id="password"
					name="password"
					placeholder="PASSWORD"
					type="password"
					onChange={onChange}
					value={form.password}
				/>
				{type === 'register' && (
					<TextInput
						id="passwordConfirm"
						name="passwordConfirm"
						placeholder="CONFIRM PASSWORD"
						type="password"
						onChange={onChange}
						value={form.passwordConfirm}
					/>
				)}
				<ErrorMessage>{error}</ErrorMessage>
				<Button className="grey darken-3" node="button" waves="light">
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
