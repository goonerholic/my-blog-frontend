import React, { ReactElement } from 'react';
import ErrorMessage from '../components/common/ErrorMessage';
import HeaderContainer from '../containers/common/HeaderContainer';

export default function NotFound(): ReactElement {
	return (
		<div>
			<HeaderContainer />
			<ErrorMessage />
		</div>
	);
}
