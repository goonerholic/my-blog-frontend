import React, { ReactElement } from 'react';
import { Button } from 'react-materialize';
import './WriteActionButtons.scss';

interface Props {
	onCancel: () => void;
	onPublish: () => void;
}

export default function WriteActionButtons({
	onCancel,
	onPublish,
}: Props): ReactElement {
	return (
		<div className="WriteActionButtons">
			<Button small onClick={onPublish}>
				Post
			</Button>
			<Button small className="blue-grey darken-4" onClick={onCancel}>
				Cancel
			</Button>
		</div>
	);
}
