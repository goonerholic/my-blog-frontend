import React, { ReactElement } from 'react';
import { AxiosError } from 'axios';
import { withRouter, Router } from 'react-router-dom';

interface Props {
	error: AxiosError;
}

// function ErrorHandler({ error }: Props): ReactElement {

export default function ErrorHandler({ error }: Props): ReactElement {
	const status = error.response ? error.response.status : null;
	let message = '';
	switch (status) {
		case 500:
			message = 'Internal Server Error.';
			break;
		case 400:
			message = 'Bad Request.';
	}
	return <div></div>;
}
