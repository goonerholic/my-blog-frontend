import React, { ReactElement } from 'react';

// interface Props {
// 	status?: number | null;
// }

// function getMessage(status: number): string {
// 	switch (status) {
// 		case 500:
// 			return 'Server Error.';
// 		case 401:
// 			return 'Unauthorized.';
// 		default:
// 			return 'Page Not Found.';
// 	}
// }

export default function ErrorMessage(): ReactElement {
	return (
		<div className="ErrorMessage container">
			<h2 className="error-title">Error!!</h2>
			<p className="description">Page Not Found.</p>
		</div>
	);
}
