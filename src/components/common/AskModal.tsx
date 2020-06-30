import React, { ReactElement } from 'react';
import { Modal, Button } from 'react-materialize';

interface Props {
	triggerButtonText: string;
	title: string;
	description: string;
	confirmText: string;
	cancelText: string;
	onConfirm: () => void;
}

export default function AskModal({
	triggerButtonText,
	title,
	description,
	confirmText,
	cancelText,
	onConfirm,
}: Props): ReactElement {
	return (
		<div>
			<Modal
				actions={[
					<Button
						flat
						modal="confirm"
						node="button"
						waves="blue-grey"
						onClick={onConfirm}
					>
						{confirmText}
					</Button>,
					<Button flat modal="close" node="button">
						{cancelText}
					</Button>,
				]}
				trigger={<button>{triggerButtonText}</button>}
				options={{
					dismissible: true,
					endingTop: '10%',
					inDuration: 250,
					opacity: 0.5,
					outDuration: 250,
					preventScrolling: true,
					startingTop: '4%',
				}}
			>
				<h2>{title}</h2>
				<p>{description}</p>
			</Modal>
		</div>
	);
}
