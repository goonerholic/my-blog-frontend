import React, { ReactElement } from 'react';
import classNames from 'classnames';
import './Button.scss';

interface Props {
	color?: string;
	size?: undefined | 'full';
	children: any;
}

export default function Button({ color, size, children }: Props): ReactElement {
	return (
		<button className={classNames('button', color, size)}>
			{children}
		</button>
	);
}
