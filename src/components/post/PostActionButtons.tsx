import React, { ReactElement } from 'react';
import AskModal from '../common/AskModal';
import './PostActionButtons.scss';

interface Props {
	onEdit: () => void;
	onRemove: () => void;
}

export default function PostActionButtons({
	onEdit,
	onRemove,
}: Props): ReactElement {
	return (
		<div className="PostActionButtons">
			<button onClick={onEdit}>Edit</button>
			<AskModal
				triggerButtonText="Delete"
				title="Delete Post"
				description="Are you sure to delete the post?"
				confirmText="DELETE"
				cancelText={'CANCEL'}
				onConfirm={onRemove}
			/>
		</div>
	);
}
