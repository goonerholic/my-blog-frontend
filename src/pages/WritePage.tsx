import React, { ReactElement } from 'react';
import EditorContainer from './../containers/write/EditorContainer';
import TagBoxContainer from './../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from './../containers/write/WriteActionButtonsContainer';
import { Helmet } from 'react-helmet-async';

export default function WritePage(): ReactElement {
	return (
		<div className="container">
			<Helmet>
				<title>Write Post - 보통인부</title>
			</Helmet>
			<EditorContainer />
			<TagBoxContainer />
			<WriteActionButtonsContainer />
		</div>
	);
}
