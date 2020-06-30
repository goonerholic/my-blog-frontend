import React, { ReactElement } from 'react';
import { Modal, Button } from 'react-materialize';

interface Props {
	isActive: boolean;
	title: string;
	description: string;
	confirmText: string;
	toggleModalState: () => void;
}

export default function ConfirmModal({
	isActive,
	title,
	description,
	confirmText,
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
					onClick={toggleModalState}
				>
					{confirmText}
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
