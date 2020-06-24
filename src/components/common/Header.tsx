import React, { ReactElement } from 'react';
import { Navbar, Icon, Button } from 'react-materialize';
import './Header.scss';

interface Props {}

export default function Header({}: Props): ReactElement {
	return (
		<Navbar
			className="Header"
			alignLinks="right"
			brand={
				<a className="brand-logo" href="/">
					GOONERHOLIC
				</a>
			}
			menuIcon={<Icon>menu</Icon>}
		>
			<a className="btn cyan waves-effect waves-light" href="/login">
				sign in
			</a>
		</Navbar>
	);
}
