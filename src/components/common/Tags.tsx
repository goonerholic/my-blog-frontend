import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './Tags.scss';

interface Props {
	tags: string[];
}

export default function Tags({ tags }: Props): ReactElement {
	return (
		<div className="Tags">
			{tags.map((tag) => (
				<Link className="tag" to={`/?tag=${tag}`} key={tag}>
					#{tag}
				</Link>
			))}
		</div>
	);
}
