import React, { ReactElement } from 'react';
import ErrorMessage from '../components/common/ErrorMessage';
import HeaderContainer from '../containers/common/HeaderContainer';

interface Props {}

export default function NotFound({}: Props): ReactElement {
	return (
		<div>
			<HeaderContainer />
			<ErrorMessage />
		</div>
	);
}
