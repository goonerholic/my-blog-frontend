import React, { ReactElement } from 'react';
import { Navbar, Icon, NavItem } from 'react-materialize';
import { Link } from 'react-router-dom';
import './Header.scss';

interface Props {
	user: {
		_id: string;
		username: string;
	} | null;
	onLogout: () => void;
}

export default function Header({ user, onLogout }: Props): ReactElement {
	return (
		<Navbar
			className="Header cyan darken-4"
			alignLinks="right"
			brand={
				<a className="brand-logo" href="/">
					GOONERHOLIC
				</a>
			}
			menuIcon={<Icon>menu</Icon>}
		>
			{user ? <NavItem>{user.username}</NavItem> : ''}
			<Link
				className="btn waves-effect waves-light"
				to={user ? '/' : '/login'}
				onClick={user ? onLogout : undefined}
			>
				{user ? 'sign out' : 'sign in'}
			</Link>
		</Navbar>
	);
}
