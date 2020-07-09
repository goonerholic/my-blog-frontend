import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './SubInfo.scss';

interface Props {
	username: string;
	publishedDate: Date;
	hasMarginTop?: boolean;
}

export default function SubInfo({
	username,
	publishedDate,
	hasMarginTop,
}: Props): ReactElement {
	return (
		<div className="SubInfo">
			<span>
				<b>
					<Link to={`/@${username}`}>{username}</Link>
				</b>
			</span>
			<span>{publishedDate.toLocaleDateString()}</span>
		</div>
	);
}
