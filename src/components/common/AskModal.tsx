import React, { ReactElement } from 'react';
import { Modal, Button } from 'react-materialize';

interface Props {
	isActive: boolean;
	title: string;
	description: string;
	confirmText: string;
	cancelText: string;
	onConfirm: () => void;
	toggleModalState: () => void;
}

export default function AskModal({
	isActive,
	title,
	description,
	confirmText,
	cancelText,
	onConfirm,
	toggleModalState,
}: Props): ReactElement {
	return (
		<Modal
			actions={[
				<Button
					flat
					modal="confirm"
					node="button"
					waves="light"
					onClick={onConfirm}
				>
					{confirmText}
				</Button>,
				<Button
					flat
					modal="close"
					node="button"
					waves="light"
					onClick={toggleModalState}
				>
					{cancelText}
				</Button>,
			]}
			open={isActive}
			options={{
				dismissible: true,
				endingTop: '10%',
				inDuration: 250,
				opacity: 0.5,
				outDuration: 250,
				preventScrolling: true,
				startingTop: '4%',
			}}
			id="askModal"
		>
			<h2>{title}</h2>
			<p>{description}</p>
		</Modal>
	);
}
