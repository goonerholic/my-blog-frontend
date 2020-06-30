import React, { ReactElement } from 'react';
import './PostActionButtons.scss';

interface Props {
	onEdit: () => void;
}

export default function PostActionButtons({ onEdit }: Props): ReactElement {
	return (
		<div className="PostActionButtons">
			<button onClick={onEdit}>Edit</button>
			<button>Delete</button>
		</div>
	);
}
