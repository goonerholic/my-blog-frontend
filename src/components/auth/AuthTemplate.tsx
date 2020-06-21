import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './AuthTemplate.scss';

interface Props {
	children: ReactElement;
}

export default function AuthTemplate({ children }: Props): ReactElement {
	return (
		<div className="AuthTemplate">
			<div className="white-box">
				<div className="logo-area">
					<Link to="/">GOONERHOLIC</Link>
				</div>
				{children}
			</div>
		</div>
	);
}
