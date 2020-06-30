import React, { ReactElement, useState } from 'react';
import { Button } from 'react-materialize';
import './WriteActionButtons.scss';
import ConfirmModal from '../common/ConfirmModal';

interface Props {
	onCancel: () => void;
	onPublish: () => void;
	isEdit: boolean;
	title: string;
	body: string;
	tags: string[];
}

export default function WriteActionButtons({
	onCancel,
	onPublish,
	isEdit,
	title,
	body,
}: Props): ReactElement {
	const [modalState, setModalState] = useState(false);
	const toggleModal = () => {
		setModalState(!modalState);
	};
	const onClick = () => {
		if (!title || !body) {
			toggleModal();
			return;
		}
		onPublish();
	};
	return (
		<div className="WriteActionButtons">
			<Button small onClick={onClick}>
				{isEdit ? 'Update' : 'Post'}
			</Button>
			<Button small className="blue-grey darken-4" onClick={onCancel}>
				Cancel
			</Button>
			<ConfirmModal
				isActive={modalState}
				title="Empty Input Fields"
				description="Title or post must be written."
				confirmText="CONFIRM"
				toggleModalState={toggleModal}
			/>
		</div>
	);
}
