import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './AuthTemplate.scss';
import { CardPanel } from 'react-materialize';

interface Props {
	children: ReactElement;
}

export default function AuthTemplate({ children }: Props): ReactElement {
	return (
		<div className="AuthTemplate">
			<CardPanel className="white-box">
				<div className="logo-area">
					<Link to="/">GOONERHOLIC</Link>
				</div>
				{children}
			</CardPanel>
		</div>
	);
}
