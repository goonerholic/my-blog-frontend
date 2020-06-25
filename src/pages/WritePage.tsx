import React, { ReactElement } from 'react';
import EditorContainer from './../containers/write/EditorContainer';
import TagBoxContainer from './../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from './../containers/write/WriteActionButtonsContainer';

export default function WritePage(): ReactElement {
	return (
		<div className="container">
			<EditorContainer />
			<TagBoxContainer />
			<WriteActionButtonsContainer />
		</div>
	);
}
