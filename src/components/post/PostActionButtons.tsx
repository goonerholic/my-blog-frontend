import React, { ReactElement, useState } from 'react';
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
	const [modalState, setModalState] = useState(false);
	const toggleModal = () => {
		setModalState(!modalState);
	};
	return (
		<div className="PostActionButtons">
			<button onClick={onEdit}>Edit</button>
			<button onClick={toggleModal}>Delete</button>
			<AskModal
				isActive={modalState}
				title="Delete Post"
				description="Are you sure to delete this post?"
				confirmText="DELETE"
				cancelText="CANCEL"
				onConfirm={onRemove}
				toggleModalState={toggleModal}
			/>
		</div>
	);
}
