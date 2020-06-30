import React, { ReactElement } from 'react';
import { Button } from 'react-materialize';
import './WriteActionButtons.scss';

interface Props {
	onCancel: () => void;
	onPublish: () => void;
	isEdit: boolean;
}

export default function WriteActionButtons({
	onCancel,
	onPublish,
	isEdit,
}: Props): ReactElement {
	return (
		<div className="WriteActionButtons">
			<Button small onClick={onPublish}>
				{isEdit ? 'Update' : 'Post'}
			</Button>
			<Button small className="blue-grey darken-4" onClick={onCancel}>
				Cancel
			</Button>
		</div>
	);
}
