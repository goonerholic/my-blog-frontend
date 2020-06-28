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
			className="Header white lighten-3"
			alignLinks="right"
			brand={
				<a className="brand-logo black-text" href="/">
					GOONERHOLIC
				</a>
			}
			menuIcon={<Icon className="black-text">menu</Icon>}
		>
			{user ? (
				<NavItem className="black-text">{user.username}</NavItem>
			) : (
				''
			)}
			<Link
				className="btn grey darken-3 waves-effect waves-light"
				to={user ? '/' : '/login'}
				onClick={user ? onLogout : undefined}
			>
				{user ? 'sign out' : 'sign in'}
			</Link>
		</Navbar>
	);
}
